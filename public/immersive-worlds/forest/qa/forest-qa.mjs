var Fh={exports:{}},Qo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dv;function iM(){if(Dv)return Qo;Dv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var h in o)h!=="key"&&(c[h]=o[h])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return Qo.Fragment=t,Qo.jsx=n,Qo.jsxs=n,Qo}var Uv;function aM(){return Uv||(Uv=1,Fh.exports=iM()),Fh.exports}var be=aM(),Hh={exports:{}},re={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lv;function sM(){if(Lv)return re;Lv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function x(N){return N===null||typeof N!="object"?null:(N=g&&N[g]||N["@@iterator"],typeof N=="function"?N:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,y={};function S(N,et,Q){this.props=N,this.context=et,this.refs=y,this.updater=Q||b}S.prototype.isReactComponent={},S.prototype.setState=function(N,et){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,et,"setState")},S.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function C(){}C.prototype=S.prototype;function O(N,et,Q){this.props=N,this.context=et,this.refs=y,this.updater=Q||b}var A=O.prototype=new C;A.constructor=O,w(A,S.prototype),A.isPureReactComponent=!0;var U=Array.isArray;function L(){}var I={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function P(N,et,Q){var j=Q.ref;return{$$typeof:r,type:N,key:et,ref:j!==void 0?j:null,props:Q}}function F(N,et){return P(N.type,et,N.props)}function W(N){return typeof N=="object"&&N!==null&&N.$$typeof===r}function H(N){var et={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(Q){return et[Q]})}var $=/\/+/g;function k(N,et){return typeof N=="object"&&N!==null&&N.key!=null?H(""+N.key):et.toString(36)}function tt(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(L,L):(N.status="pending",N.then(function(et){N.status==="pending"&&(N.status="fulfilled",N.value=et)},function(et){N.status==="pending"&&(N.status="rejected",N.reason=et)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function B(N,et,Q,j,bt){var wt=typeof N;(wt==="undefined"||wt==="boolean")&&(N=null);var st=!1;if(N===null)st=!0;else switch(wt){case"bigint":case"string":case"number":st=!0;break;case"object":switch(N.$$typeof){case r:case t:st=!0;break;case v:return st=N._init,B(st(N._payload),et,Q,j,bt)}}if(st)return bt=bt(N),st=j===""?"."+k(N,0):j,U(bt)?(Q="",st!=null&&(Q=st.replace($,"$&/")+"/"),B(bt,et,Q,"",function(It){return It})):bt!=null&&(W(bt)&&(bt=F(bt,Q+(bt.key==null||N&&N.key===bt.key?"":(""+bt.key).replace($,"$&/")+"/")+st)),et.push(bt)),1;st=0;var pt=j===""?".":j+":";if(U(N))for(var Tt=0;Tt<N.length;Tt++)j=N[Tt],wt=pt+k(j,Tt),st+=B(j,et,Q,wt,bt);else if(Tt=x(N),typeof Tt=="function")for(N=Tt.call(N),Tt=0;!(j=N.next()).done;)j=j.value,wt=pt+k(j,Tt++),st+=B(j,et,Q,wt,bt);else if(wt==="object"){if(typeof N.then=="function")return B(tt(N),et,Q,j,bt);throw et=String(N),Error("Objects are not valid as a React child (found: "+(et==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":et)+"). If you meant to render a collection of children, use an array instead.")}return st}function X(N,et,Q){if(N==null)return N;var j=[],bt=0;return B(N,j,"","",function(wt){return et.call(Q,wt,bt++)}),j}function q(N){if(N._status===-1){var et=N._result;et=et(),et.then(function(Q){(N._status===0||N._status===-1)&&(N._status=1,N._result=Q)},function(Q){(N._status===0||N._status===-1)&&(N._status=2,N._result=Q)}),N._status===-1&&(N._status=0,N._result=et)}if(N._status===1)return N._result.default;throw N._result}var nt=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var et=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(et))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},rt={map:X,forEach:function(N,et,Q){X(N,function(){et.apply(this,arguments)},Q)},count:function(N){var et=0;return X(N,function(){et++}),et},toArray:function(N){return X(N,function(et){return et})||[]},only:function(N){if(!W(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return re.Activity=_,re.Children=rt,re.Component=S,re.Fragment=n,re.Profiler=o,re.PureComponent=O,re.StrictMode=a,re.Suspense=m,re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,re.__COMPILER_RUNTIME={__proto__:null,c:function(N){return I.H.useMemoCache(N)}},re.cache=function(N){return function(){return N.apply(null,arguments)}},re.cacheSignal=function(){return null},re.cloneElement=function(N,et,Q){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var j=w({},N.props),bt=N.key;if(et!=null)for(wt in et.key!==void 0&&(bt=""+et.key),et)!T.call(et,wt)||wt==="key"||wt==="__self"||wt==="__source"||wt==="ref"&&et.ref===void 0||(j[wt]=et[wt]);var wt=arguments.length-2;if(wt===1)j.children=Q;else if(1<wt){for(var st=Array(wt),pt=0;pt<wt;pt++)st[pt]=arguments[pt+2];j.children=st}return P(N.type,bt,j)},re.createContext=function(N){return N={$$typeof:u,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:c,_context:N},N},re.createElement=function(N,et,Q){var j,bt={},wt=null;if(et!=null)for(j in et.key!==void 0&&(wt=""+et.key),et)T.call(et,j)&&j!=="key"&&j!=="__self"&&j!=="__source"&&(bt[j]=et[j]);var st=arguments.length-2;if(st===1)bt.children=Q;else if(1<st){for(var pt=Array(st),Tt=0;Tt<st;Tt++)pt[Tt]=arguments[Tt+2];bt.children=pt}if(N&&N.defaultProps)for(j in st=N.defaultProps,st)bt[j]===void 0&&(bt[j]=st[j]);return P(N,wt,bt)},re.createRef=function(){return{current:null}},re.forwardRef=function(N){return{$$typeof:h,render:N}},re.isValidElement=W,re.lazy=function(N){return{$$typeof:v,_payload:{_status:-1,_result:N},_init:q}},re.memo=function(N,et){return{$$typeof:d,type:N,compare:et===void 0?null:et}},re.startTransition=function(N){var et=I.T,Q={};I.T=Q;try{var j=N(),bt=I.S;bt!==null&&bt(Q,j),typeof j=="object"&&j!==null&&typeof j.then=="function"&&j.then(L,nt)}catch(wt){nt(wt)}finally{et!==null&&Q.types!==null&&(et.types=Q.types),I.T=et}},re.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},re.use=function(N){return I.H.use(N)},re.useActionState=function(N,et,Q){return I.H.useActionState(N,et,Q)},re.useCallback=function(N,et){return I.H.useCallback(N,et)},re.useContext=function(N){return I.H.useContext(N)},re.useDebugValue=function(){},re.useDeferredValue=function(N,et){return I.H.useDeferredValue(N,et)},re.useEffect=function(N,et){return I.H.useEffect(N,et)},re.useEffectEvent=function(N){return I.H.useEffectEvent(N)},re.useId=function(){return I.H.useId()},re.useImperativeHandle=function(N,et,Q){return I.H.useImperativeHandle(N,et,Q)},re.useInsertionEffect=function(N,et){return I.H.useInsertionEffect(N,et)},re.useLayoutEffect=function(N,et){return I.H.useLayoutEffect(N,et)},re.useMemo=function(N,et){return I.H.useMemo(N,et)},re.useOptimistic=function(N,et){return I.H.useOptimistic(N,et)},re.useReducer=function(N,et,Q){return I.H.useReducer(N,et,Q)},re.useRef=function(N){return I.H.useRef(N)},re.useState=function(N){return I.H.useState(N)},re.useSyncExternalStore=function(N,et,Q){return I.H.useSyncExternalStore(N,et,Q)},re.useTransition=function(){return I.H.useTransition()},re.version="19.2.7",re}var Nv;function _p(){return Nv||(Nv=1,Hh.exports=sM()),Hh.exports}var ze=_p(),Gh={exports:{}},jo={},Vh={exports:{}},kh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ov;function rM(){return Ov||(Ov=1,(function(r){function t(B,X){var q=B.length;B.push(X);t:for(;0<q;){var nt=q-1>>>1,rt=B[nt];if(0<o(rt,X))B[nt]=X,B[q]=rt,q=nt;else break t}}function n(B){return B.length===0?null:B[0]}function a(B){if(B.length===0)return null;var X=B[0],q=B.pop();if(q!==X){B[0]=q;t:for(var nt=0,rt=B.length,N=rt>>>1;nt<N;){var et=2*(nt+1)-1,Q=B[et],j=et+1,bt=B[j];if(0>o(Q,q))j<rt&&0>o(bt,Q)?(B[nt]=bt,B[j]=q,nt=j):(B[nt]=Q,B[et]=q,nt=et);else if(j<rt&&0>o(bt,q))B[nt]=bt,B[j]=q,nt=j;else break t}}return X}function o(B,X){var q=B.sortIndex-X.sortIndex;return q!==0?q:B.id-X.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,h=u.now();r.unstable_now=function(){return u.now()-h}}var m=[],d=[],v=1,_=null,g=3,x=!1,b=!1,w=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,C=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function A(B){for(var X=n(d);X!==null;){if(X.callback===null)a(d);else if(X.startTime<=B)a(d),X.sortIndex=X.expirationTime,t(m,X);else break;X=n(d)}}function U(B){if(w=!1,A(B),!b)if(n(m)!==null)b=!0,L||(L=!0,H());else{var X=n(d);X!==null&&tt(U,X.startTime-B)}}var L=!1,I=-1,T=5,P=-1;function F(){return y?!0:!(r.unstable_now()-P<T)}function W(){if(y=!1,L){var B=r.unstable_now();P=B;var X=!0;try{t:{b=!1,w&&(w=!1,C(I),I=-1),x=!0;var q=g;try{e:{for(A(B),_=n(m);_!==null&&!(_.expirationTime>B&&F());){var nt=_.callback;if(typeof nt=="function"){_.callback=null,g=_.priorityLevel;var rt=nt(_.expirationTime<=B);if(B=r.unstable_now(),typeof rt=="function"){_.callback=rt,A(B),X=!0;break e}_===n(m)&&a(m),A(B)}else a(m);_=n(m)}if(_!==null)X=!0;else{var N=n(d);N!==null&&tt(U,N.startTime-B),X=!1}}break t}finally{_=null,g=q,x=!1}X=void 0}}finally{X?H():L=!1}}}var H;if(typeof O=="function")H=function(){O(W)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,k=$.port2;$.port1.onmessage=W,H=function(){k.postMessage(null)}}else H=function(){S(W,0)};function tt(B,X){I=S(function(){B(r.unstable_now())},X)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(B){switch(g){case 1:case 2:case 3:var X=3;break;default:X=g}var q=g;g=X;try{return B()}finally{g=q}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(B,X){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var q=g;g=B;try{return X()}finally{g=q}},r.unstable_scheduleCallback=function(B,X,q){var nt=r.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?nt+q:nt):q=nt,B){case 1:var rt=-1;break;case 2:rt=250;break;case 5:rt=1073741823;break;case 4:rt=1e4;break;default:rt=5e3}return rt=q+rt,B={id:v++,callback:X,priorityLevel:B,startTime:q,expirationTime:rt,sortIndex:-1},q>nt?(B.sortIndex=q,t(d,B),n(m)===null&&B===n(d)&&(w?(C(I),I=-1):w=!0,tt(U,q-nt))):(B.sortIndex=rt,t(m,B),b||x||(b=!0,L||(L=!0,H()))),B},r.unstable_shouldYield=F,r.unstable_wrapCallback=function(B){var X=g;return function(){var q=g;g=X;try{return B.apply(this,arguments)}finally{g=q}}}})(kh)),kh}var Pv;function oM(){return Pv||(Pv=1,Vh.exports=rM()),Vh.exports}var Xh={exports:{}},In={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Iv;function lM(){if(Iv)return In;Iv=1;var r=_p();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)d+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,d,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:m,containerInfo:d,implementation:v}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,In.createPortal=function(m,d){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(m,d,null,v)},In.flushSync=function(m){var d=u.T,v=a.p;try{if(u.T=null,a.p=2,m)return m()}finally{u.T=d,a.p=v,a.d.f()}},In.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,a.d.C(m,d))},In.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},In.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var v=d.as,_=h(v,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,x=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;v==="style"?a.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:x}):v==="script"&&a.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:x,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},In.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var v=h(d.as,d.crossOrigin);a.d.M(m,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&a.d.M(m)},In.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var v=d.as,_=h(v,d.crossOrigin);a.d.L(m,v,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},In.preloadModule=function(m,d){if(typeof m=="string")if(d){var v=h(d.as,d.crossOrigin);a.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else a.d.m(m)},In.requestFormReset=function(m){a.d.r(m)},In.unstable_batchedUpdates=function(m,d){return m(d)},In.useFormState=function(m,d,v){return u.H.useFormState(m,d,v)},In.useFormStatus=function(){return u.H.useHostTransitionStatus()},In.version="19.2.7",In}var zv;function cM(){if(zv)return Xh.exports;zv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Xh.exports=lM(),Xh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bv;function uM(){if(Bv)return jo;Bv=1;var r=oM(),t=_p(),n=cM();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function u(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(a(188))}function d(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,l=i;;){var f=s.return;if(f===null)break;var p=f.alternate;if(p===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===p.child){for(p=f.child;p;){if(p===s)return m(f),e;if(p===l)return m(f),i;p=p.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=p;else{for(var M=!1,D=f.child;D;){if(D===s){M=!0,s=f,l=p;break}if(D===l){M=!0,l=f,s=p;break}D=D.sibling}if(!M){for(D=p.child;D;){if(D===s){M=!0,s=p,l=f;break}if(D===l){M=!0,l=p,s=f;break}D=D.sibling}if(!M)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function v(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=v(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),C=Symbol.for("react.consumer"),O=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),U=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),P=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),W=Symbol.iterator;function H(e){return e===null||typeof e!="object"?null:(e=W&&e[W]||e["@@iterator"],typeof e=="function"?e:null)}var $=Symbol.for("react.client.reference");function k(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===$?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case S:return"Profiler";case y:return"StrictMode";case U:return"Suspense";case L:return"SuspenseList";case P:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case O:return e.displayName||"Context";case C:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case I:return i=e.displayName||null,i!==null?i:k(e.type)||"Memo";case T:i=e._payload,e=e._init;try{return k(e(i))}catch{}}return null}var tt=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q={pending:!1,data:null,method:null,action:null},nt=[],rt=-1;function N(e){return{current:e}}function et(e){0>rt||(e.current=nt[rt],nt[rt]=null,rt--)}function Q(e,i){rt++,nt[rt]=e.current,e.current=i}var j=N(null),bt=N(null),wt=N(null),st=N(null);function pt(e,i){switch(Q(wt,i),Q(bt,e),Q(j,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?$g(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=$g(i),e=tv(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}et(j),Q(j,e)}function Tt(){et(j),et(bt),et(wt)}function It(e){e.memoizedState!==null&&Q(st,e);var i=j.current,s=tv(i,e.type);i!==s&&(Q(bt,e),Q(j,s))}function At(e){bt.current===e&&(et(j),et(bt)),st.current===e&&(et(st),Yo._currentValue=q)}var ee,Be;function ne(e){if(ee===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);ee=i&&i[1]||"",Be=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ee+e+Be}var me=!1;function Ce(e,i){if(!e||me)return"";me=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var Mt=function(){throw Error()};if(Object.defineProperty(Mt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Mt,[])}catch(mt){var ht=mt}Reflect.construct(e,[],Mt)}else{try{Mt.call()}catch(mt){ht=mt}e.call(Mt.prototype)}}else{try{throw Error()}catch(mt){ht=mt}(Mt=e())&&typeof Mt.catch=="function"&&Mt.catch(function(){})}}catch(mt){if(mt&&ht&&typeof mt.stack=="string")return[mt.stack,ht.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var p=l.DetermineComponentFrameRoot(),M=p[0],D=p[1];if(M&&D){var V=M.split(`
`),ft=D.split(`
`);for(f=l=0;l<V.length&&!V[l].includes("DetermineComponentFrameRoot");)l++;for(;f<ft.length&&!ft[f].includes("DetermineComponentFrameRoot");)f++;if(l===V.length||f===ft.length)for(l=V.length-1,f=ft.length-1;1<=l&&0<=f&&V[l]!==ft[f];)f--;for(;1<=l&&0<=f;l--,f--)if(V[l]!==ft[f]){if(l!==1||f!==1)do if(l--,f--,0>f||V[l]!==ft[f]){var xt=`
`+V[l].replace(" at new "," at ");return e.displayName&&xt.includes("<anonymous>")&&(xt=xt.replace("<anonymous>",e.displayName)),xt}while(1<=l&&0<=f);break}}}finally{me=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?ne(s):""}function ue(e,i){switch(e.tag){case 26:case 27:case 5:return ne(e.type);case 16:return ne("Lazy");case 13:return e.child!==i&&i!==null?ne("Suspense Fallback"):ne("Suspense");case 19:return ne("SuspenseList");case 0:case 15:return Ce(e.type,!1);case 11:return Ce(e.type.render,!1);case 1:return Ce(e.type,!0);case 31:return ne("Activity");default:return""}}function we(e){try{var i="",s=null;do i+=ue(e,s),s=e,e=e.return;while(e);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var je=Object.prototype.hasOwnProperty,ln=r.unstable_scheduleCallback,Oe=r.unstable_cancelCallback,$e=r.unstable_shouldYield,K=r.unstable_requestPaint,De=r.unstable_now,_e=r.unstable_getCurrentPriorityLevel,z=r.unstable_ImmediatePriority,E=r.unstable_UserBlockingPriority,it=r.unstable_NormalPriority,ot=r.unstable_LowPriority,vt=r.unstable_IdlePriority,Rt=r.log,Ut=r.unstable_setDisableYieldValue,gt=null,_t=null;function Ct(e){if(typeof Rt=="function"&&Ut(e),_t&&typeof _t.setStrictMode=="function")try{_t.setStrictMode(gt,e)}catch{}}var Vt=Math.clz32?Math.clz32:Qt,Pt=Math.log,Nt=Math.LN2;function Qt(e){return e>>>=0,e===0?32:31-(Pt(e)/Nt|0)|0}var jt=256,se=262144,J=4194304;function Dt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function St(e,i,s){var l=e.pendingLanes;if(l===0)return 0;var f=0,p=e.suspendedLanes,M=e.pingedLanes;e=e.warmLanes;var D=l&134217727;return D!==0?(l=D&~p,l!==0?f=Dt(l):(M&=D,M!==0?f=Dt(M):s||(s=D&~e,s!==0&&(f=Dt(s))))):(D=l&~p,D!==0?f=Dt(D):M!==0?f=Dt(M):s||(s=l&~e,s!==0&&(f=Dt(s)))),f===0?0:i!==0&&i!==f&&(i&p)===0&&(p=f&-f,s=i&-i,p>=s||p===32&&(s&4194048)!==0)?i:f}function Lt(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Ft(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Et(){var e=J;return J<<=1,(J&62914560)===0&&(J=4194304),e}function Jt(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function qt(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function We(e,i,s,l,f,p){var M=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var D=e.entanglements,V=e.expirationTimes,ft=e.hiddenUpdates;for(s=M&~s;0<s;){var xt=31-Vt(s),Mt=1<<xt;D[xt]=0,V[xt]=-1;var ht=ft[xt];if(ht!==null)for(ft[xt]=null,xt=0;xt<ht.length;xt++){var mt=ht[xt];mt!==null&&(mt.lane&=-536870913)}s&=~Mt}l!==0&&Ue(e,l,0),p!==0&&f===0&&e.tag!==0&&(e.suspendedLanes|=p&~(M&~i))}function Ue(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-Vt(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|s&261930}function qn(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var l=31-Vt(s),f=1<<l;f&i|e[l]&i&&(e[l]|=i),s&=~f}}function ii(e,i){var s=i&-i;return s=(s&42)!==0?1:so(s),(s&(e.suspendedLanes|i))!==0?0:s}function so(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ro(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function oo(){var e=X.p;return e!==0?e:(e=window.event,e===void 0?32:bv(e.type))}function Qs(e,i){var s=X.p;try{return X.p=e,i()}finally{X.p=s}}var Xi=Math.random().toString(36).slice(2),pn="__reactFiber$"+Xi,Cn="__reactProps$"+Xi,Yn="__reactContainer$"+Xi,vs="__reactEvents$"+Xi,Dl="__reactListeners$"+Xi,Ul="__reactHandles$"+Xi,_s="__reactResources$"+Xi,Pa="__reactMarker$"+Xi;function Ia(e){delete e[pn],delete e[Cn],delete e[vs],delete e[Dl],delete e[Ul]}function sa(e){var i=e[pn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Yn]||s[pn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=ov(e);e!==null;){if(s=e[pn])return s;e=ov(e)}return i}e=s,s=e.parentNode}return null}function ra(e){if(e=e[pn]||e[Yn]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function xs(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function za(e){var i=e[_s];return i||(i=e[_s]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function mn(e){e[Pa]=!0}var Ll=new Set,lo={};function R(e,i){Y(e,i),Y(e+"Capture",i)}function Y(e,i){for(lo[e]=i,e=0;e<i.length;e++)Ll.add(i[e])}var dt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),lt={},ct={};function zt(e){return je.call(ct,e)?!0:je.call(lt,e)?!1:dt.test(e)?ct[e]=!0:(lt[e]=!0,!1)}function kt(e,i,s){if(zt(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Ot(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function Ht(e,i,s,l){if(l===null)e.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+l)}}function Gt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function le(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function ge(e,i,s){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,p=l.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return f.call(this)},set:function(M){s=""+M,p.call(this,M)}}),Object.defineProperty(e,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(M){s=""+M},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Yt(e){if(!e._valueTracker){var i=le(e)?"checked":"value";e._valueTracker=ge(e,i,""+e[i])}}function Le(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return e&&(l=le(e)?e.checked?"true":"false":e.value),e=l,e!==s?(i.setValue(e),!0):!1}function tn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Je=/[\n"\\]/g;function he(e){return e.replace(Je,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function gn(e,i,s,l,f,p,M,D){e.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?e.type=M:e.removeAttribute("type"),i!=null?M==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Gt(i)):e.value!==""+Gt(i)&&(e.value=""+Gt(i)):M!=="submit"&&M!=="reset"||e.removeAttribute("value"),i!=null?bn(e,M,Gt(i)):s!=null?bn(e,M,Gt(s)):l!=null&&e.removeAttribute("value"),f==null&&p!=null&&(e.defaultChecked=!!p),f!=null&&(e.checked=f&&typeof f!="function"&&typeof f!="symbol"),D!=null&&typeof D!="function"&&typeof D!="symbol"&&typeof D!="boolean"?e.name=""+Gt(D):e.removeAttribute("name")}function Xt(e,i,s,l,f,p,M,D){if(p!=null&&typeof p!="function"&&typeof p!="symbol"&&typeof p!="boolean"&&(e.type=p),i!=null||s!=null){if(!(p!=="submit"&&p!=="reset"||i!=null)){Yt(e);return}s=s!=null?""+Gt(s):"",i=i!=null?""+Gt(i):s,D||i===e.value||(e.value=i),e.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=D?e.checked:!!l,e.defaultChecked=!!l,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(e.name=M),Yt(e)}function bn(e,i,s){i==="number"&&tn(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function de(e,i,s,l){if(e=e.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<e.length;s++)f=i.hasOwnProperty("$"+e[s].value),e[s].selected!==f&&(e[s].selected=f),f&&l&&(e[s].defaultSelected=!0)}else{for(s=""+Gt(s),i=null,f=0;f<e.length;f++){if(e[f].value===s){e[f].selected=!0,l&&(e[f].defaultSelected=!0);return}i!==null||e[f].disabled||(i=e[f])}i!==null&&(i.selected=!0)}}function Hn(e,i,s){if(i!=null&&(i=""+Gt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Gt(s):""}function ai(e,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(tt(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Gt(i),e.defaultValue=s,l=e.textContent,l===s&&l!==""&&l!==null&&(e.value=l),Yt(e)}function Gn(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var Ba=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Fe(e,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,s):typeof s!="number"||s===0||Ba.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function sn(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&Fe(e,f,l)}else for(var p in i)i.hasOwnProperty(p)&&Fe(e,p,i[p])}function gi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qe=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Wi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ui(e){return Wi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function vi(){}var Pu=null;function Iu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var js=null,$s=null;function jp(e){var i=ra(e);if(i&&(e=i.stateNode)){var s=e[Cn]||null;t:switch(e=i.stateNode,i.type){case"input":if(gn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+he(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==e&&l.form===e.form){var f=l[Cn]||null;if(!f)throw Error(a(90));gn(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===e.form&&Le(l)}break t;case"textarea":Hn(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&de(e,!!s.multiple,i,!1)}}}var zu=!1;function $p(e,i,s){if(zu)return e(i,s);zu=!0;try{var l=e(i);return l}finally{if(zu=!1,(js!==null||$s!==null)&&(xc(),js&&(i=js,e=$s,$s=js=null,jp(i),e)))for(i=0;i<e.length;i++)jp(e[i])}}function co(e,i){var s=e.stateNode;if(s===null)return null;var l=s[Cn]||null;if(l===null)return null;s=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var oa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Bu=!1;if(oa)try{var uo={};Object.defineProperty(uo,"passive",{get:function(){Bu=!0}}),window.addEventListener("test",uo,uo),window.removeEventListener("test",uo,uo)}catch{Bu=!1}var Fa=null,Fu=null,Nl=null;function tm(){if(Nl)return Nl;var e,i=Fu,s=i.length,l,f="value"in Fa?Fa.value:Fa.textContent,p=f.length;for(e=0;e<s&&i[e]===f[e];e++);var M=s-e;for(l=1;l<=M&&i[s-l]===f[p-l];l++);return Nl=f.slice(e,1<l?1-l:void 0)}function Ol(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Pl(){return!0}function em(){return!1}function Zn(e){function i(s,l,f,p,M){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=p,this.target=M,this.currentTarget=null;for(var D in e)e.hasOwnProperty(D)&&(s=e[D],this[D]=s?s(p):p[D]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?Pl:em,this.isPropagationStopped=em,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Pl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Pl)},persist:function(){},isPersistent:Pl}),i}var Ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=Zn(Ss),fo=_({},Ss,{view:0,detail:0}),eS=Zn(fo),Hu,Gu,ho,zl=_({},fo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ku,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ho&&(ho&&e.type==="mousemove"?(Hu=e.screenX-ho.screenX,Gu=e.screenY-ho.screenY):Gu=Hu=0,ho=e),Hu)},movementY:function(e){return"movementY"in e?e.movementY:Gu}}),nm=Zn(zl),nS=_({},zl,{dataTransfer:0}),iS=Zn(nS),aS=_({},fo,{relatedTarget:0}),Vu=Zn(aS),sS=_({},Ss,{animationName:0,elapsedTime:0,pseudoElement:0}),rS=Zn(sS),oS=_({},Ss,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),lS=Zn(oS),cS=_({},Ss,{data:0}),im=Zn(cS),uS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},fS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dS(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=hS[e])?!!i[e]:!1}function ku(){return dS}var pS=_({},fo,{key:function(e){if(e.key){var i=uS[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Ol(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?fS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ku,charCode:function(e){return e.type==="keypress"?Ol(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ol(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),mS=Zn(pS),gS=_({},zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),am=Zn(gS),vS=_({},fo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ku}),_S=Zn(vS),xS=_({},Ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),SS=Zn(xS),yS=_({},zl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),MS=Zn(yS),bS=_({},Ss,{newState:0,oldState:0}),ES=Zn(bS),TS=[9,13,27,32],Xu=oa&&"CompositionEvent"in window,po=null;oa&&"documentMode"in document&&(po=document.documentMode);var AS=oa&&"TextEvent"in window&&!po,sm=oa&&(!Xu||po&&8<po&&11>=po),rm=" ",om=!1;function lm(e,i){switch(e){case"keyup":return TS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function cm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var tr=!1;function wS(e,i){switch(e){case"compositionend":return cm(i);case"keypress":return i.which!==32?null:(om=!0,rm);case"textInput":return e=i.data,e===rm&&om?null:e;default:return null}}function RS(e,i){if(tr)return e==="compositionend"||!Xu&&lm(e,i)?(e=tm(),Nl=Fu=Fa=null,tr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return sm&&i.locale!=="ko"?null:i.data;default:return null}}var CS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function um(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!CS[e.type]:i==="textarea"}function fm(e,i,s,l){js?$s?$s.push(l):$s=[l]:js=l,i=Ac(i,"onChange"),0<i.length&&(s=new Il("onChange","change",null,s,l),e.push({event:s,listeners:i}))}var mo=null,go=null;function DS(e){Yg(e,0)}function Bl(e){var i=xs(e);if(Le(i))return e}function hm(e,i){if(e==="change")return i}var dm=!1;if(oa){var Wu;if(oa){var qu="oninput"in document;if(!qu){var pm=document.createElement("div");pm.setAttribute("oninput","return;"),qu=typeof pm.oninput=="function"}Wu=qu}else Wu=!1;dm=Wu&&(!document.documentMode||9<document.documentMode)}function mm(){mo&&(mo.detachEvent("onpropertychange",gm),go=mo=null)}function gm(e){if(e.propertyName==="value"&&Bl(go)){var i=[];fm(i,go,e,Iu(e)),$p(DS,i)}}function US(e,i,s){e==="focusin"?(mm(),mo=i,go=s,mo.attachEvent("onpropertychange",gm)):e==="focusout"&&mm()}function LS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Bl(go)}function NS(e,i){if(e==="click")return Bl(i)}function OS(e,i){if(e==="input"||e==="change")return Bl(i)}function PS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var si=typeof Object.is=="function"?Object.is:PS;function vo(e,i){if(si(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!je.call(i,f)||!si(e[f],i[f]))return!1}return!0}function vm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function _m(e,i){var s=vm(e);e=0;for(var l;s;){if(s.nodeType===3){if(l=e+s.textContent.length,e<=i&&l>=i)return{node:s,offset:i-e};e=l}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=vm(s)}}function xm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?xm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Sm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=tn(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=tn(e.document)}return i}function Yu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var IS=oa&&"documentMode"in document&&11>=document.documentMode,er=null,Zu=null,_o=null,Ku=!1;function ym(e,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Ku||er==null||er!==tn(l)||(l=er,"selectionStart"in l&&Yu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),_o&&vo(_o,l)||(_o=l,l=Ac(Zu,"onSelect"),0<l.length&&(i=new Il("onSelect","select",null,i,s),e.push({event:i,listeners:l}),i.target=er)))}function ys(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var nr={animationend:ys("Animation","AnimationEnd"),animationiteration:ys("Animation","AnimationIteration"),animationstart:ys("Animation","AnimationStart"),transitionrun:ys("Transition","TransitionRun"),transitionstart:ys("Transition","TransitionStart"),transitioncancel:ys("Transition","TransitionCancel"),transitionend:ys("Transition","TransitionEnd")},Ju={},Mm={};oa&&(Mm=document.createElement("div").style,"AnimationEvent"in window||(delete nr.animationend.animation,delete nr.animationiteration.animation,delete nr.animationstart.animation),"TransitionEvent"in window||delete nr.transitionend.transition);function Ms(e){if(Ju[e])return Ju[e];if(!nr[e])return e;var i=nr[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in Mm)return Ju[e]=i[s];return e}var bm=Ms("animationend"),Em=Ms("animationiteration"),Tm=Ms("animationstart"),zS=Ms("transitionrun"),BS=Ms("transitionstart"),FS=Ms("transitioncancel"),Am=Ms("transitionend"),wm=new Map,Qu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Qu.push("scrollEnd");function Li(e,i){wm.set(e,i),R(i,[e])}var Fl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},_i=[],ir=0,ju=0;function Hl(){for(var e=ir,i=ju=ir=0;i<e;){var s=_i[i];_i[i++]=null;var l=_i[i];_i[i++]=null;var f=_i[i];_i[i++]=null;var p=_i[i];if(_i[i++]=null,l!==null&&f!==null){var M=l.pending;M===null?f.next=f:(f.next=M.next,M.next=f),l.pending=f}p!==0&&Rm(s,f,p)}}function Gl(e,i,s,l){_i[ir++]=e,_i[ir++]=i,_i[ir++]=s,_i[ir++]=l,ju|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function $u(e,i,s,l){return Gl(e,i,s,l),Vl(e)}function bs(e,i){return Gl(e,null,null,i),Vl(e)}function Rm(e,i,s){e.lanes|=s;var l=e.alternate;l!==null&&(l.lanes|=s);for(var f=!1,p=e.return;p!==null;)p.childLanes|=s,l=p.alternate,l!==null&&(l.childLanes|=s),p.tag===22&&(e=p.stateNode,e===null||e._visibility&1||(f=!0)),e=p,p=p.return;return e.tag===3?(p=e.stateNode,f&&i!==null&&(f=31-Vt(s),e=p.hiddenUpdates,l=e[f],l===null?e[f]=[i]:l.push(i),i.lane=s|536870912),p):null}function Vl(e){if(50<Ho)throw Ho=0,ch=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var ar={};function HS(e,i,s,l){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(e,i,s,l){return new HS(e,i,s,l)}function tf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function la(e,i){var s=e.alternate;return s===null?(s=ri(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function Cm(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function kl(e,i,s,l,f,p){var M=0;if(l=e,typeof e=="function")tf(e)&&(M=1);else if(typeof e=="string")M=Wy(e,s,j.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case P:return e=ri(31,s,i,f),e.elementType=P,e.lanes=p,e;case w:return Es(s.children,f,p,i);case y:M=8,f|=24;break;case S:return e=ri(12,s,i,f|2),e.elementType=S,e.lanes=p,e;case U:return e=ri(13,s,i,f),e.elementType=U,e.lanes=p,e;case L:return e=ri(19,s,i,f),e.elementType=L,e.lanes=p,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case O:M=10;break t;case C:M=9;break t;case A:M=11;break t;case I:M=14;break t;case T:M=16,l=null;break t}M=29,s=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=ri(M,s,i,f),i.elementType=e,i.type=l,i.lanes=p,i}function Es(e,i,s,l){return e=ri(7,e,l,i),e.lanes=s,e}function ef(e,i,s){return e=ri(6,e,null,i),e.lanes=s,e}function Dm(e){var i=ri(18,null,null,0);return i.stateNode=e,i}function nf(e,i,s){return i=ri(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var Um=new WeakMap;function xi(e,i){if(typeof e=="object"&&e!==null){var s=Um.get(e);return s!==void 0?s:(i={value:e,source:i,stack:we(i)},Um.set(e,i),i)}return{value:e,source:i,stack:we(i)}}var sr=[],rr=0,Xl=null,xo=0,Si=[],yi=0,Ha=null,qi=1,Yi="";function ca(e,i){sr[rr++]=xo,sr[rr++]=Xl,Xl=e,xo=i}function Lm(e,i,s){Si[yi++]=qi,Si[yi++]=Yi,Si[yi++]=Ha,Ha=e;var l=qi;e=Yi;var f=32-Vt(l)-1;l&=~(1<<f),s+=1;var p=32-Vt(i)+f;if(30<p){var M=f-f%5;p=(l&(1<<M)-1).toString(32),l>>=M,f-=M,qi=1<<32-Vt(i)+f|s<<f|l,Yi=p+e}else qi=1<<p|s<<f|l,Yi=e}function af(e){e.return!==null&&(ca(e,1),Lm(e,1,0))}function sf(e){for(;e===Xl;)Xl=sr[--rr],sr[rr]=null,xo=sr[--rr],sr[rr]=null;for(;e===Ha;)Ha=Si[--yi],Si[yi]=null,Yi=Si[--yi],Si[yi]=null,qi=Si[--yi],Si[yi]=null}function Nm(e,i){Si[yi++]=qi,Si[yi++]=Yi,Si[yi++]=Ha,qi=i.id,Yi=i.overflow,Ha=e}var Dn=null,en=null,Te=!1,Ga=null,Mi=!1,rf=Error(a(519));function Va(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw So(xi(i,e)),rf}function Om(e){var i=e.stateNode,s=e.type,l=e.memoizedProps;switch(i[pn]=e,i[Cn]=l,s){case"dialog":Se("cancel",i),Se("close",i);break;case"iframe":case"object":case"embed":Se("load",i);break;case"video":case"audio":for(s=0;s<Vo.length;s++)Se(Vo[s],i);break;case"source":Se("error",i);break;case"img":case"image":case"link":Se("error",i),Se("load",i);break;case"details":Se("toggle",i);break;case"input":Se("invalid",i),Xt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":Se("invalid",i);break;case"textarea":Se("invalid",i),ai(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||Qg(i.textContent,s)?(l.popover!=null&&(Se("beforetoggle",i),Se("toggle",i)),l.onScroll!=null&&Se("scroll",i),l.onScrollEnd!=null&&Se("scrollend",i),l.onClick!=null&&(i.onclick=vi),i=!0):i=!1,i||Va(e,!0)}function Pm(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:Dn=Dn.return}}function or(e){if(e!==Dn)return!1;if(!Te)return Pm(e),Te=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||Eh(e.type,e.memoizedProps)),s=!s),s&&en&&Va(e),Pm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));en=rv(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));en=rv(e)}else i===27?(i=en,ns(e.type)?(e=Ch,Ch=null,en=e):en=i):en=Dn?Ei(e.stateNode.nextSibling):null;return!0}function Ts(){en=Dn=null,Te=!1}function of(){var e=Ga;return e!==null&&(jn===null?jn=e:jn.push.apply(jn,e),Ga=null),e}function So(e){Ga===null?Ga=[e]:Ga.push(e)}var lf=N(null),As=null,ua=null;function ka(e,i,s){Q(lf,i._currentValue),i._currentValue=s}function fa(e){e._currentValue=lf.current,et(lf)}function cf(e,i,s){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===s)break;e=e.return}}function uf(e,i,s,l){var f=e.child;for(f!==null&&(f.return=e);f!==null;){var p=f.dependencies;if(p!==null){var M=f.child;p=p.firstContext;t:for(;p!==null;){var D=p;p=f;for(var V=0;V<i.length;V++)if(D.context===i[V]){p.lanes|=s,D=p.alternate,D!==null&&(D.lanes|=s),cf(p.return,s,e),l||(M=null);break t}p=D.next}}else if(f.tag===18){if(M=f.return,M===null)throw Error(a(341));M.lanes|=s,p=M.alternate,p!==null&&(p.lanes|=s),cf(M,s,e),M=null}else M=f.child;if(M!==null)M.return=f;else for(M=f;M!==null;){if(M===e){M=null;break}if(f=M.sibling,f!==null){f.return=M.return,M=f;break}M=M.return}f=M}}function lr(e,i,s,l){e=null;for(var f=i,p=!1;f!==null;){if(!p){if((f.flags&524288)!==0)p=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var M=f.alternate;if(M===null)throw Error(a(387));if(M=M.memoizedProps,M!==null){var D=f.type;si(f.pendingProps.value,M.value)||(e!==null?e.push(D):e=[D])}}else if(f===st.current){if(M=f.alternate,M===null)throw Error(a(387));M.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(e!==null?e.push(Yo):e=[Yo])}f=f.return}e!==null&&uf(i,e,s,l),i.flags|=262144}function Wl(e){for(e=e.firstContext;e!==null;){if(!si(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ws(e){As=e,ua=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return Im(As,e)}function ql(e,i){return As===null&&ws(e),Im(e,i)}function Im(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ua===null){if(e===null)throw Error(a(308));ua=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ua=ua.next=i;return s}var GS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},VS=r.unstable_scheduleCallback,kS=r.unstable_NormalPriority,vn={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ff(){return{controller:new GS,data:new Map,refCount:0}}function yo(e){e.refCount--,e.refCount===0&&VS(kS,function(){e.controller.abort()})}var Mo=null,hf=0,cr=0,ur=null;function XS(e,i){if(Mo===null){var s=Mo=[];hf=0,cr=mh(),ur={status:"pending",value:void 0,then:function(l){s.push(l)}}}return hf++,i.then(zm,zm),i}function zm(){if(--hf===0&&Mo!==null){ur!==null&&(ur.status="fulfilled");var e=Mo;Mo=null,cr=0,ur=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function WS(e,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var Bm=B.S;B.S=function(e,i){yg=De(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&XS(e,i),Bm!==null&&Bm(e,i)};var Rs=N(null);function df(){var e=Rs.current;return e!==null?e:Qe.pooledCache}function Yl(e,i){i===null?Q(Rs,Rs.current):Q(Rs,i.pool)}function Fm(){var e=df();return e===null?null:{parent:vn._currentValue,pool:e}}var fr=Error(a(460)),pf=Error(a(474)),Zl=Error(a(542)),Kl={then:function(){}};function Hm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Gm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(vi,vi),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,km(e),e;default:if(typeof i.status=="string")i.then(vi,vi);else{if(e=Qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,km(e),e}throw Ds=i,fr}}function Cs(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Ds=s,fr):s}}var Ds=null;function Vm(){if(Ds===null)throw Error(a(459));var e=Ds;return Ds=null,e}function km(e){if(e===fr||e===Zl)throw Error(a(483))}var hr=null,bo=0;function Jl(e){var i=bo;return bo+=1,hr===null&&(hr=[]),Gm(hr,e,i)}function Eo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Ql(e,i){throw i.$$typeof===g?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Xm(e){function i(at,Z){if(e){var ut=at.deletions;ut===null?(at.deletions=[Z],at.flags|=16):ut.push(Z)}}function s(at,Z){if(!e)return null;for(;Z!==null;)i(at,Z),Z=Z.sibling;return null}function l(at){for(var Z=new Map;at!==null;)at.key!==null?Z.set(at.key,at):Z.set(at.index,at),at=at.sibling;return Z}function f(at,Z){return at=la(at,Z),at.index=0,at.sibling=null,at}function p(at,Z,ut){return at.index=ut,e?(ut=at.alternate,ut!==null?(ut=ut.index,ut<Z?(at.flags|=67108866,Z):ut):(at.flags|=67108866,Z)):(at.flags|=1048576,Z)}function M(at){return e&&at.alternate===null&&(at.flags|=67108866),at}function D(at,Z,ut,yt){return Z===null||Z.tag!==6?(Z=ef(ut,at.mode,yt),Z.return=at,Z):(Z=f(Z,ut),Z.return=at,Z)}function V(at,Z,ut,yt){var $t=ut.type;return $t===w?xt(at,Z,ut.props.children,yt,ut.key):Z!==null&&(Z.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===T&&Cs($t)===Z.type)?(Z=f(Z,ut.props),Eo(Z,ut),Z.return=at,Z):(Z=kl(ut.type,ut.key,ut.props,null,at.mode,yt),Eo(Z,ut),Z.return=at,Z)}function ft(at,Z,ut,yt){return Z===null||Z.tag!==4||Z.stateNode.containerInfo!==ut.containerInfo||Z.stateNode.implementation!==ut.implementation?(Z=nf(ut,at.mode,yt),Z.return=at,Z):(Z=f(Z,ut.children||[]),Z.return=at,Z)}function xt(at,Z,ut,yt,$t){return Z===null||Z.tag!==7?(Z=Es(ut,at.mode,yt,$t),Z.return=at,Z):(Z=f(Z,ut),Z.return=at,Z)}function Mt(at,Z,ut){if(typeof Z=="string"&&Z!==""||typeof Z=="number"||typeof Z=="bigint")return Z=ef(""+Z,at.mode,ut),Z.return=at,Z;if(typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case x:return ut=kl(Z.type,Z.key,Z.props,null,at.mode,ut),Eo(ut,Z),ut.return=at,ut;case b:return Z=nf(Z,at.mode,ut),Z.return=at,Z;case T:return Z=Cs(Z),Mt(at,Z,ut)}if(tt(Z)||H(Z))return Z=Es(Z,at.mode,ut,null),Z.return=at,Z;if(typeof Z.then=="function")return Mt(at,Jl(Z),ut);if(Z.$$typeof===O)return Mt(at,ql(at,Z),ut);Ql(at,Z)}return null}function ht(at,Z,ut,yt){var $t=Z!==null?Z.key:null;if(typeof ut=="string"&&ut!==""||typeof ut=="number"||typeof ut=="bigint")return $t!==null?null:D(at,Z,""+ut,yt);if(typeof ut=="object"&&ut!==null){switch(ut.$$typeof){case x:return ut.key===$t?V(at,Z,ut,yt):null;case b:return ut.key===$t?ft(at,Z,ut,yt):null;case T:return ut=Cs(ut),ht(at,Z,ut,yt)}if(tt(ut)||H(ut))return $t!==null?null:xt(at,Z,ut,yt,null);if(typeof ut.then=="function")return ht(at,Z,Jl(ut),yt);if(ut.$$typeof===O)return ht(at,Z,ql(at,ut),yt);Ql(at,ut)}return null}function mt(at,Z,ut,yt,$t){if(typeof yt=="string"&&yt!==""||typeof yt=="number"||typeof yt=="bigint")return at=at.get(ut)||null,D(Z,at,""+yt,$t);if(typeof yt=="object"&&yt!==null){switch(yt.$$typeof){case x:return at=at.get(yt.key===null?ut:yt.key)||null,V(Z,at,yt,$t);case b:return at=at.get(yt.key===null?ut:yt.key)||null,ft(Z,at,yt,$t);case T:return yt=Cs(yt),mt(at,Z,ut,yt,$t)}if(tt(yt)||H(yt))return at=at.get(ut)||null,xt(Z,at,yt,$t,null);if(typeof yt.then=="function")return mt(at,Z,ut,Jl(yt),$t);if(yt.$$typeof===O)return mt(at,Z,ut,ql(Z,yt),$t);Ql(Z,yt)}return null}function Zt(at,Z,ut,yt){for(var $t=null,Pe=null,Kt=Z,fe=Z=0,Me=null;Kt!==null&&fe<ut.length;fe++){Kt.index>fe?(Me=Kt,Kt=null):Me=Kt.sibling;var Ie=ht(at,Kt,ut[fe],yt);if(Ie===null){Kt===null&&(Kt=Me);break}e&&Kt&&Ie.alternate===null&&i(at,Kt),Z=p(Ie,Z,fe),Pe===null?$t=Ie:Pe.sibling=Ie,Pe=Ie,Kt=Me}if(fe===ut.length)return s(at,Kt),Te&&ca(at,fe),$t;if(Kt===null){for(;fe<ut.length;fe++)Kt=Mt(at,ut[fe],yt),Kt!==null&&(Z=p(Kt,Z,fe),Pe===null?$t=Kt:Pe.sibling=Kt,Pe=Kt);return Te&&ca(at,fe),$t}for(Kt=l(Kt);fe<ut.length;fe++)Me=mt(Kt,at,fe,ut[fe],yt),Me!==null&&(e&&Me.alternate!==null&&Kt.delete(Me.key===null?fe:Me.key),Z=p(Me,Z,fe),Pe===null?$t=Me:Pe.sibling=Me,Pe=Me);return e&&Kt.forEach(function(os){return i(at,os)}),Te&&ca(at,fe),$t}function ie(at,Z,ut,yt){if(ut==null)throw Error(a(151));for(var $t=null,Pe=null,Kt=Z,fe=Z=0,Me=null,Ie=ut.next();Kt!==null&&!Ie.done;fe++,Ie=ut.next()){Kt.index>fe?(Me=Kt,Kt=null):Me=Kt.sibling;var os=ht(at,Kt,Ie.value,yt);if(os===null){Kt===null&&(Kt=Me);break}e&&Kt&&os.alternate===null&&i(at,Kt),Z=p(os,Z,fe),Pe===null?$t=os:Pe.sibling=os,Pe=os,Kt=Me}if(Ie.done)return s(at,Kt),Te&&ca(at,fe),$t;if(Kt===null){for(;!Ie.done;fe++,Ie=ut.next())Ie=Mt(at,Ie.value,yt),Ie!==null&&(Z=p(Ie,Z,fe),Pe===null?$t=Ie:Pe.sibling=Ie,Pe=Ie);return Te&&ca(at,fe),$t}for(Kt=l(Kt);!Ie.done;fe++,Ie=ut.next())Ie=mt(Kt,at,fe,Ie.value,yt),Ie!==null&&(e&&Ie.alternate!==null&&Kt.delete(Ie.key===null?fe:Ie.key),Z=p(Ie,Z,fe),Pe===null?$t=Ie:Pe.sibling=Ie,Pe=Ie);return e&&Kt.forEach(function(nM){return i(at,nM)}),Te&&ca(at,fe),$t}function Ke(at,Z,ut,yt){if(typeof ut=="object"&&ut!==null&&ut.type===w&&ut.key===null&&(ut=ut.props.children),typeof ut=="object"&&ut!==null){switch(ut.$$typeof){case x:t:{for(var $t=ut.key;Z!==null;){if(Z.key===$t){if($t=ut.type,$t===w){if(Z.tag===7){s(at,Z.sibling),yt=f(Z,ut.props.children),yt.return=at,at=yt;break t}}else if(Z.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===T&&Cs($t)===Z.type){s(at,Z.sibling),yt=f(Z,ut.props),Eo(yt,ut),yt.return=at,at=yt;break t}s(at,Z);break}else i(at,Z);Z=Z.sibling}ut.type===w?(yt=Es(ut.props.children,at.mode,yt,ut.key),yt.return=at,at=yt):(yt=kl(ut.type,ut.key,ut.props,null,at.mode,yt),Eo(yt,ut),yt.return=at,at=yt)}return M(at);case b:t:{for($t=ut.key;Z!==null;){if(Z.key===$t)if(Z.tag===4&&Z.stateNode.containerInfo===ut.containerInfo&&Z.stateNode.implementation===ut.implementation){s(at,Z.sibling),yt=f(Z,ut.children||[]),yt.return=at,at=yt;break t}else{s(at,Z);break}else i(at,Z);Z=Z.sibling}yt=nf(ut,at.mode,yt),yt.return=at,at=yt}return M(at);case T:return ut=Cs(ut),Ke(at,Z,ut,yt)}if(tt(ut))return Zt(at,Z,ut,yt);if(H(ut)){if($t=H(ut),typeof $t!="function")throw Error(a(150));return ut=$t.call(ut),ie(at,Z,ut,yt)}if(typeof ut.then=="function")return Ke(at,Z,Jl(ut),yt);if(ut.$$typeof===O)return Ke(at,Z,ql(at,ut),yt);Ql(at,ut)}return typeof ut=="string"&&ut!==""||typeof ut=="number"||typeof ut=="bigint"?(ut=""+ut,Z!==null&&Z.tag===6?(s(at,Z.sibling),yt=f(Z,ut),yt.return=at,at=yt):(s(at,Z),yt=ef(ut,at.mode,yt),yt.return=at,at=yt),M(at)):s(at,Z)}return function(at,Z,ut,yt){try{bo=0;var $t=Ke(at,Z,ut,yt);return hr=null,$t}catch(Kt){if(Kt===fr||Kt===Zl)throw Kt;var Pe=ri(29,Kt,null,at.mode);return Pe.lanes=yt,Pe.return=at,Pe}finally{}}}var Us=Xm(!0),Wm=Xm(!1),Xa=!1;function mf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function gf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function qa(e,i,s){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(He&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=Vl(e),Rm(e,null,s),i}return Gl(e,l,i,s),Vl(e)}function To(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,qn(e,s)}}function vf(e,i){var s=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,p=null;if(s=s.firstBaseUpdate,s!==null){do{var M={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};p===null?f=p=M:p=p.next=M,s=s.next}while(s!==null);p===null?f=p=i:p=p.next=i}else f=p=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:p,shared:l.shared,callbacks:l.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var _f=!1;function Ao(){if(_f){var e=ur;if(e!==null)throw e}}function wo(e,i,s,l){_f=!1;var f=e.updateQueue;Xa=!1;var p=f.firstBaseUpdate,M=f.lastBaseUpdate,D=f.shared.pending;if(D!==null){f.shared.pending=null;var V=D,ft=V.next;V.next=null,M===null?p=ft:M.next=ft,M=V;var xt=e.alternate;xt!==null&&(xt=xt.updateQueue,D=xt.lastBaseUpdate,D!==M&&(D===null?xt.firstBaseUpdate=ft:D.next=ft,xt.lastBaseUpdate=V))}if(p!==null){var Mt=f.baseState;M=0,xt=ft=V=null,D=p;do{var ht=D.lane&-536870913,mt=ht!==D.lane;if(mt?(ye&ht)===ht:(l&ht)===ht){ht!==0&&ht===cr&&(_f=!0),xt!==null&&(xt=xt.next={lane:0,tag:D.tag,payload:D.payload,callback:null,next:null});t:{var Zt=e,ie=D;ht=i;var Ke=s;switch(ie.tag){case 1:if(Zt=ie.payload,typeof Zt=="function"){Mt=Zt.call(Ke,Mt,ht);break t}Mt=Zt;break t;case 3:Zt.flags=Zt.flags&-65537|128;case 0:if(Zt=ie.payload,ht=typeof Zt=="function"?Zt.call(Ke,Mt,ht):Zt,ht==null)break t;Mt=_({},Mt,ht);break t;case 2:Xa=!0}}ht=D.callback,ht!==null&&(e.flags|=64,mt&&(e.flags|=8192),mt=f.callbacks,mt===null?f.callbacks=[ht]:mt.push(ht))}else mt={lane:ht,tag:D.tag,payload:D.payload,callback:D.callback,next:null},xt===null?(ft=xt=mt,V=Mt):xt=xt.next=mt,M|=ht;if(D=D.next,D===null){if(D=f.shared.pending,D===null)break;mt=D,D=mt.next,mt.next=null,f.lastBaseUpdate=mt,f.shared.pending=null}}while(!0);xt===null&&(V=Mt),f.baseState=V,f.firstBaseUpdate=ft,f.lastBaseUpdate=xt,p===null&&(f.shared.lanes=0),Qa|=M,e.lanes=M,e.memoizedState=Mt}}function qm(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function Ym(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)qm(s[e],i)}var dr=N(null),jl=N(0);function Zm(e,i){e=Sa,Q(jl,e),Q(dr,i),Sa=e|i.baseLanes}function xf(){Q(jl,Sa),Q(dr,dr.current)}function Sf(){Sa=jl.current,et(dr),et(jl)}var oi=N(null),bi=null;function Ya(e){var i=e.alternate;Q(fn,fn.current&1),Q(oi,e),bi===null&&(i===null||dr.current!==null||i.memoizedState!==null)&&(bi=e)}function yf(e){Q(fn,fn.current),Q(oi,e),bi===null&&(bi=e)}function Km(e){e.tag===22?(Q(fn,fn.current),Q(oi,e),bi===null&&(bi=e)):Za()}function Za(){Q(fn,fn.current),Q(oi,oi.current)}function li(e){et(oi),bi===e&&(bi=null),et(fn)}var fn=N(0);function $l(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||wh(s)||Rh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ha=0,ce=null,Ye=null,_n=null,tc=!1,pr=!1,Ls=!1,ec=0,Ro=0,mr=null,qS=0;function cn(){throw Error(a(321))}function Mf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!si(e[s],i[s]))return!1;return!0}function bf(e,i,s,l,f,p){return ha=p,ce=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,B.H=e===null||e.memoizedState===null?L0:Bf,Ls=!1,p=s(l,f),Ls=!1,pr&&(p=Qm(i,s,l,f)),Jm(e),p}function Jm(e){B.H=Uo;var i=Ye!==null&&Ye.next!==null;if(ha=0,_n=Ye=ce=null,tc=!1,Ro=0,mr=null,i)throw Error(a(300));e===null||xn||(e=e.dependencies,e!==null&&Wl(e)&&(xn=!0))}function Qm(e,i,s,l){ce=e;var f=0;do{if(pr&&(mr=null),Ro=0,pr=!1,25<=f)throw Error(a(301));if(f+=1,_n=Ye=null,e.updateQueue!=null){var p=e.updateQueue;p.lastEffect=null,p.events=null,p.stores=null,p.memoCache!=null&&(p.memoCache.index=0)}B.H=N0,p=i(s,l)}while(pr);return p}function YS(){var e=B.H,i=e.useState()[0];return i=typeof i.then=="function"?Co(i):i,e=e.useState()[0],(Ye!==null?Ye.memoizedState:null)!==e&&(ce.flags|=1024),i}function Ef(){var e=ec!==0;return ec=0,e}function Tf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function Af(e){if(tc){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}tc=!1}ha=0,_n=Ye=ce=null,pr=!1,Ro=ec=0,mr=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _n===null?ce.memoizedState=_n=e:_n=_n.next=e,_n}function hn(){if(Ye===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Ye.next;var i=_n===null?ce.memoizedState:_n.next;if(i!==null)_n=i,Ye=e;else{if(e===null)throw ce.alternate===null?Error(a(467)):Error(a(310));Ye=e,e={memoizedState:Ye.memoizedState,baseState:Ye.baseState,baseQueue:Ye.baseQueue,queue:Ye.queue,next:null},_n===null?ce.memoizedState=_n=e:_n=_n.next=e}return _n}function nc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Co(e){var i=Ro;return Ro+=1,mr===null&&(mr=[]),e=Gm(mr,e,i),i=ce,(_n===null?i.memoizedState:_n.next)===null&&(i=i.alternate,B.H=i===null||i.memoizedState===null?L0:Bf),e}function ic(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Co(e);if(e.$$typeof===O)return Un(e)}throw Error(a(438,String(e)))}function wf(e){var i=null,s=ce.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=ce.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=nc(),ce.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),l=0;l<e;l++)s[l]=F;return i.index++,s}function da(e,i){return typeof i=="function"?i(e):i}function ac(e){var i=hn();return Rf(i,Ye,e)}function Rf(e,i,s){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=e.baseQueue,p=l.pending;if(p!==null){if(f!==null){var M=f.next;f.next=p.next,p.next=M}i.baseQueue=f=p,l.pending=null}if(p=e.baseState,f===null)e.memoizedState=p;else{i=f.next;var D=M=null,V=null,ft=i,xt=!1;do{var Mt=ft.lane&-536870913;if(Mt!==ft.lane?(ye&Mt)===Mt:(ha&Mt)===Mt){var ht=ft.revertLane;if(ht===0)V!==null&&(V=V.next={lane:0,revertLane:0,gesture:null,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null}),Mt===cr&&(xt=!0);else if((ha&ht)===ht){ft=ft.next,ht===cr&&(xt=!0);continue}else Mt={lane:0,revertLane:ft.revertLane,gesture:null,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null},V===null?(D=V=Mt,M=p):V=V.next=Mt,ce.lanes|=ht,Qa|=ht;Mt=ft.action,Ls&&s(p,Mt),p=ft.hasEagerState?ft.eagerState:s(p,Mt)}else ht={lane:Mt,revertLane:ft.revertLane,gesture:ft.gesture,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null},V===null?(D=V=ht,M=p):V=V.next=ht,ce.lanes|=Mt,Qa|=Mt;ft=ft.next}while(ft!==null&&ft!==i);if(V===null?M=p:V.next=D,!si(p,e.memoizedState)&&(xn=!0,xt&&(s=ur,s!==null)))throw s;e.memoizedState=p,e.baseState=M,e.baseQueue=V,l.lastRenderedState=p}return f===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Cf(e){var i=hn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var l=s.dispatch,f=s.pending,p=i.memoizedState;if(f!==null){s.pending=null;var M=f=f.next;do p=e(p,M.action),M=M.next;while(M!==f);si(p,i.memoizedState)||(xn=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),s.lastRenderedState=p}return[p,l]}function jm(e,i,s){var l=ce,f=hn(),p=Te;if(p){if(s===void 0)throw Error(a(407));s=s()}else s=i();var M=!si((Ye||f).memoizedState,s);if(M&&(f.memoizedState=s,xn=!0),f=f.queue,Lf(e0.bind(null,l,f,e),[e]),f.getSnapshot!==i||M||_n!==null&&_n.memoizedState.tag&1){if(l.flags|=2048,gr(9,{destroy:void 0},t0.bind(null,l,f,s,i),null),Qe===null)throw Error(a(349));p||(ha&127)!==0||$m(l,i,s)}return s}function $m(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=ce.updateQueue,i===null?(i=nc(),ce.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function t0(e,i,s,l){i.value=s,i.getSnapshot=l,n0(i)&&i0(e)}function e0(e,i,s){return s(function(){n0(i)&&i0(e)})}function n0(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!si(e,s)}catch{return!0}}function i0(e){var i=bs(e,2);i!==null&&$n(i,e,2)}function Df(e){var i=Vn();if(typeof e=="function"){var s=e;if(e=s(),Ls){Ct(!0);try{s()}finally{Ct(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:e},i}function a0(e,i,s,l){return e.baseState=s,Rf(e,Ye,typeof l=="function"?l:da)}function ZS(e,i,s,l,f){if(oc(e))throw Error(a(485));if(e=i.action,e!==null){var p={payload:f,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){p.listeners.push(M)}};B.T!==null?s(!0):p.isTransition=!1,l(p),s=i.pending,s===null?(p.next=i.pending=p,s0(i,p)):(p.next=s.next,i.pending=s.next=p)}}function s0(e,i){var s=i.action,l=i.payload,f=e.state;if(i.isTransition){var p=B.T,M={};B.T=M;try{var D=s(f,l),V=B.S;V!==null&&V(M,D),r0(e,i,D)}catch(ft){Uf(e,i,ft)}finally{p!==null&&M.types!==null&&(p.types=M.types),B.T=p}}else try{p=s(f,l),r0(e,i,p)}catch(ft){Uf(e,i,ft)}}function r0(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){o0(e,i,l)},function(l){return Uf(e,i,l)}):o0(e,i,s)}function o0(e,i,s){i.status="fulfilled",i.value=s,l0(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,s0(e,s)))}function Uf(e,i,s){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,l0(i),i=i.next;while(i!==l)}e.action=null}function l0(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function c0(e,i){return i}function u0(e,i){if(Te){var s=Qe.formState;if(s!==null){t:{var l=ce;if(Te){if(en){e:{for(var f=en,p=Mi;f.nodeType!==8;){if(!p){f=null;break e}if(f=Ei(f.nextSibling),f===null){f=null;break e}}p=f.data,f=p==="F!"||p==="F"?f:null}if(f){en=Ei(f.nextSibling),l=f.data==="F!";break t}}Va(l)}l=!1}l&&(i=s[0])}}return s=Vn(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:c0,lastRenderedState:i},s.queue=l,s=C0.bind(null,ce,l),l.dispatch=s,l=Df(!1),p=zf.bind(null,ce,!1,l.queue),l=Vn(),f={state:i,dispatch:null,action:e,pending:null},l.queue=f,s=ZS.bind(null,ce,f,p,s),f.dispatch=s,l.memoizedState=e,[i,s,!1]}function f0(e){var i=hn();return h0(i,Ye,e)}function h0(e,i,s){if(i=Rf(e,i,c0)[0],e=ac(da)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=Co(i)}catch(M){throw M===fr?Zl:M}else l=i;i=hn();var f=i.queue,p=f.dispatch;return s!==i.memoizedState&&(ce.flags|=2048,gr(9,{destroy:void 0},KS.bind(null,f,s),null)),[l,p,e]}function KS(e,i){e.action=i}function d0(e){var i=hn(),s=Ye;if(s!==null)return h0(i,s,e);hn(),i=i.memoizedState,s=hn();var l=s.queue.dispatch;return s.memoizedState=e,[i,l,!1]}function gr(e,i,s,l){return e={tag:e,create:s,deps:l,inst:i,next:null},i=ce.updateQueue,i===null&&(i=nc(),ce.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(l=s.next,s.next=e,e.next=l,i.lastEffect=e),e}function p0(){return hn().memoizedState}function sc(e,i,s,l){var f=Vn();ce.flags|=e,f.memoizedState=gr(1|i,{destroy:void 0},s,l===void 0?null:l)}function rc(e,i,s,l){var f=hn();l=l===void 0?null:l;var p=f.memoizedState.inst;Ye!==null&&l!==null&&Mf(l,Ye.memoizedState.deps)?f.memoizedState=gr(i,p,s,l):(ce.flags|=e,f.memoizedState=gr(1|i,p,s,l))}function m0(e,i){sc(8390656,8,e,i)}function Lf(e,i){rc(2048,8,e,i)}function JS(e){ce.flags|=4;var i=ce.updateQueue;if(i===null)i=nc(),ce.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function g0(e){var i=hn().memoizedState;return JS({ref:i,nextImpl:e}),function(){if((He&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function v0(e,i){return rc(4,2,e,i)}function _0(e,i){return rc(4,4,e,i)}function x0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function S0(e,i,s){s=s!=null?s.concat([e]):null,rc(4,4,x0.bind(null,i,e),s)}function Nf(){}function y0(e,i){var s=hn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&Mf(i,l[1])?l[0]:(s.memoizedState=[e,i],e)}function M0(e,i){var s=hn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&Mf(i,l[1]))return l[0];if(l=e(),Ls){Ct(!0);try{e()}finally{Ct(!1)}}return s.memoizedState=[l,i],l}function Of(e,i,s){return s===void 0||(ha&1073741824)!==0&&(ye&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=bg(),ce.lanes|=e,Qa|=e,s)}function b0(e,i,s,l){return si(s,i)?s:dr.current!==null?(e=Of(e,s,l),si(e,i)||(xn=!0),e):(ha&42)===0||(ha&1073741824)!==0&&(ye&261930)===0?(xn=!0,e.memoizedState=s):(e=bg(),ce.lanes|=e,Qa|=e,i)}function E0(e,i,s,l,f){var p=X.p;X.p=p!==0&&8>p?p:8;var M=B.T,D={};B.T=D,zf(e,!1,i,s);try{var V=f(),ft=B.S;if(ft!==null&&ft(D,V),V!==null&&typeof V=="object"&&typeof V.then=="function"){var xt=WS(V,l);Do(e,i,xt,fi(e))}else Do(e,i,l,fi(e))}catch(Mt){Do(e,i,{then:function(){},status:"rejected",reason:Mt},fi())}finally{X.p=p,M!==null&&D.types!==null&&(M.types=D.types),B.T=M}}function QS(){}function Pf(e,i,s,l){if(e.tag!==5)throw Error(a(476));var f=T0(e).queue;E0(e,f,i,q,s===null?QS:function(){return A0(e),s(l)})}function T0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:q,baseState:q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:q},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function A0(e){var i=T0(e);i.next===null&&(i=e.alternate.memoizedState),Do(e,i.next.queue,{},fi())}function If(){return Un(Yo)}function w0(){return hn().memoizedState}function R0(){return hn().memoizedState}function jS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=fi();e=Wa(s);var l=qa(i,e,s);l!==null&&($n(l,i,s),To(l,i,s)),i={cache:ff()},e.payload=i;return}i=i.return}}function $S(e,i,s){var l=fi();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},oc(e)?D0(i,s):(s=$u(e,i,s,l),s!==null&&($n(s,e,l),U0(s,i,l)))}function C0(e,i,s){var l=fi();Do(e,i,s,l)}function Do(e,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(oc(e))D0(i,f);else{var p=e.alternate;if(e.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var M=i.lastRenderedState,D=p(M,s);if(f.hasEagerState=!0,f.eagerState=D,si(D,M))return Gl(e,i,f,0),Qe===null&&Hl(),!1}catch{}finally{}if(s=$u(e,i,f,l),s!==null)return $n(s,e,l),U0(s,i,l),!0}return!1}function zf(e,i,s,l){if(l={lane:2,revertLane:mh(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},oc(e)){if(i)throw Error(a(479))}else i=$u(e,s,l,2),i!==null&&$n(i,e,2)}function oc(e){var i=e.alternate;return e===ce||i!==null&&i===ce}function D0(e,i){pr=tc=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function U0(e,i,s){if((s&4194048)!==0){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,qn(e,s)}}var Uo={readContext:Un,use:ic,useCallback:cn,useContext:cn,useEffect:cn,useImperativeHandle:cn,useLayoutEffect:cn,useInsertionEffect:cn,useMemo:cn,useReducer:cn,useRef:cn,useState:cn,useDebugValue:cn,useDeferredValue:cn,useTransition:cn,useSyncExternalStore:cn,useId:cn,useHostTransitionStatus:cn,useFormState:cn,useActionState:cn,useOptimistic:cn,useMemoCache:cn,useCacheRefresh:cn};Uo.useEffectEvent=cn;var L0={readContext:Un,use:ic,useCallback:function(e,i){return Vn().memoizedState=[e,i===void 0?null:i],e},useContext:Un,useEffect:m0,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,sc(4194308,4,x0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return sc(4194308,4,e,i)},useInsertionEffect:function(e,i){sc(4,2,e,i)},useMemo:function(e,i){var s=Vn();i=i===void 0?null:i;var l=e();if(Ls){Ct(!0);try{e()}finally{Ct(!1)}}return s.memoizedState=[l,i],l},useReducer:function(e,i,s){var l=Vn();if(s!==void 0){var f=s(i);if(Ls){Ct(!0);try{s(i)}finally{Ct(!1)}}}else f=i;return l.memoizedState=l.baseState=f,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:f},l.queue=e,e=e.dispatch=$S.bind(null,ce,e),[l.memoizedState,e]},useRef:function(e){var i=Vn();return e={current:e},i.memoizedState=e},useState:function(e){e=Df(e);var i=e.queue,s=C0.bind(null,ce,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:Nf,useDeferredValue:function(e,i){var s=Vn();return Of(s,e,i)},useTransition:function(){var e=Df(!1);return e=E0.bind(null,ce,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var l=ce,f=Vn();if(Te){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Qe===null)throw Error(a(349));(ye&127)!==0||$m(l,i,s)}f.memoizedState=s;var p={value:s,getSnapshot:i};return f.queue=p,m0(e0.bind(null,l,p,e),[e]),l.flags|=2048,gr(9,{destroy:void 0},t0.bind(null,l,p,s,i),null),s},useId:function(){var e=Vn(),i=Qe.identifierPrefix;if(Te){var s=Yi,l=qi;s=(l&~(1<<32-Vt(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=ec++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=qS++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:If,useFormState:u0,useActionState:u0,useOptimistic:function(e){var i=Vn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=zf.bind(null,ce,!0,s),s.dispatch=i,[e,i]},useMemoCache:wf,useCacheRefresh:function(){return Vn().memoizedState=jS.bind(null,ce)},useEffectEvent:function(e){var i=Vn(),s={impl:e};return i.memoizedState=s,function(){if((He&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Bf={readContext:Un,use:ic,useCallback:y0,useContext:Un,useEffect:Lf,useImperativeHandle:S0,useInsertionEffect:v0,useLayoutEffect:_0,useMemo:M0,useReducer:ac,useRef:p0,useState:function(){return ac(da)},useDebugValue:Nf,useDeferredValue:function(e,i){var s=hn();return b0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=ac(da)[0],i=hn().memoizedState;return[typeof e=="boolean"?e:Co(e),i]},useSyncExternalStore:jm,useId:w0,useHostTransitionStatus:If,useFormState:f0,useActionState:f0,useOptimistic:function(e,i){var s=hn();return a0(s,Ye,e,i)},useMemoCache:wf,useCacheRefresh:R0};Bf.useEffectEvent=g0;var N0={readContext:Un,use:ic,useCallback:y0,useContext:Un,useEffect:Lf,useImperativeHandle:S0,useInsertionEffect:v0,useLayoutEffect:_0,useMemo:M0,useReducer:Cf,useRef:p0,useState:function(){return Cf(da)},useDebugValue:Nf,useDeferredValue:function(e,i){var s=hn();return Ye===null?Of(s,e,i):b0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=Cf(da)[0],i=hn().memoizedState;return[typeof e=="boolean"?e:Co(e),i]},useSyncExternalStore:jm,useId:w0,useHostTransitionStatus:If,useFormState:d0,useActionState:d0,useOptimistic:function(e,i){var s=hn();return Ye!==null?a0(s,Ye,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:wf,useCacheRefresh:R0};N0.useEffectEvent=g0;function Ff(e,i,s,l){i=e.memoizedState,s=s(l,i),s=s==null?i:_({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Hf={enqueueSetState:function(e,i,s){e=e._reactInternals;var l=fi(),f=Wa(l);f.payload=i,s!=null&&(f.callback=s),i=qa(e,f,l),i!==null&&($n(i,e,l),To(i,e,l))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var l=fi(),f=Wa(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=qa(e,f,l),i!==null&&($n(i,e,l),To(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=fi(),l=Wa(s);l.tag=2,i!=null&&(l.callback=i),i=qa(e,l,s),i!==null&&($n(i,e,s),To(i,e,s))}};function O0(e,i,s,l,f,p,M){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,p,M):i.prototype&&i.prototype.isPureReactComponent?!vo(s,l)||!vo(f,p):!0}function P0(e,i,s,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==e&&Hf.enqueueReplaceState(i,i.state,null)}function Ns(e,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(e=e.defaultProps){s===i&&(s=_({},s));for(var f in e)s[f]===void 0&&(s[f]=e[f])}return s}function I0(e){Fl(e)}function z0(e){console.error(e)}function B0(e){Fl(e)}function lc(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function F0(e,i,s){try{var l=e.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Gf(e,i,s){return s=Wa(s),s.tag=3,s.payload={element:null},s.callback=function(){lc(e,i)},s}function H0(e){return e=Wa(e),e.tag=3,e}function G0(e,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var p=l.value;e.payload=function(){return f(p)},e.callback=function(){F0(i,s,l)}}var M=s.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(e.callback=function(){F0(i,s,l),typeof f!="function"&&(ja===null?ja=new Set([this]):ja.add(this));var D=l.stack;this.componentDidCatch(l.value,{componentStack:D!==null?D:""})})}function ty(e,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&lr(i,s,f,!0),s=oi.current,s!==null){switch(s.tag){case 31:case 13:return bi===null?Sc():s.alternate===null&&un===0&&(un=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===Kl?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),hh(e,l,f)),!1;case 22:return s.flags|=65536,l===Kl?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),hh(e,l,f)),!1}throw Error(a(435,s.tag))}return hh(e,l,f),Sc(),!1}if(Te)return i=oi.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==rf&&(e=Error(a(422),{cause:l}),So(xi(e,s)))):(l!==rf&&(i=Error(a(423),{cause:l}),So(xi(i,s))),e=e.current.alternate,e.flags|=65536,f&=-f,e.lanes|=f,l=xi(l,s),f=Gf(e.stateNode,l,f),vf(e,f),un!==4&&(un=2)),!1;var p=Error(a(520),{cause:l});if(p=xi(p,s),Fo===null?Fo=[p]:Fo.push(p),un!==4&&(un=2),i===null)return!0;l=xi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=f&-f,s.lanes|=e,e=Gf(s.stateNode,l,e),vf(s,e),!1;case 1:if(i=s.type,p=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(ja===null||!ja.has(p))))return s.flags|=65536,f&=-f,s.lanes|=f,f=H0(f),G0(f,e,s,l),vf(s,f),!1}s=s.return}while(s!==null);return!1}var Vf=Error(a(461)),xn=!1;function Ln(e,i,s,l){i.child=e===null?Wm(i,null,s,l):Us(i,e.child,s,l)}function V0(e,i,s,l,f){s=s.render;var p=i.ref;if("ref"in l){var M={};for(var D in l)D!=="ref"&&(M[D]=l[D])}else M=l;return ws(i),l=bf(e,i,s,M,p,f),D=Ef(),e!==null&&!xn?(Tf(e,i,f),pa(e,i,f)):(Te&&D&&af(i),i.flags|=1,Ln(e,i,l,f),i.child)}function k0(e,i,s,l,f){if(e===null){var p=s.type;return typeof p=="function"&&!tf(p)&&p.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=p,X0(e,i,p,l,f)):(e=kl(s.type,null,l,i,i.mode,f),e.ref=i.ref,e.return=i,i.child=e)}if(p=e.child,!Jf(e,f)){var M=p.memoizedProps;if(s=s.compare,s=s!==null?s:vo,s(M,l)&&e.ref===i.ref)return pa(e,i,f)}return i.flags|=1,e=la(p,l),e.ref=i.ref,e.return=i,i.child=e}function X0(e,i,s,l,f){if(e!==null){var p=e.memoizedProps;if(vo(p,l)&&e.ref===i.ref)if(xn=!1,i.pendingProps=l=p,Jf(e,f))(e.flags&131072)!==0&&(xn=!0);else return i.lanes=e.lanes,pa(e,i,f)}return kf(e,i,s,l,f)}function W0(e,i,s,l){var f=l.children,p=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(p=p!==null?p.baseLanes|s:s,e!==null){for(l=i.child=e.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~p}else l=0,i.child=null;return q0(e,i,p,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Yl(i,p!==null?p.cachePool:null),p!==null?Zm(i,p):xf(),Km(i);else return l=i.lanes=536870912,q0(e,i,p!==null?p.baseLanes|s:s,s,l)}else p!==null?(Yl(i,p.cachePool),Zm(i,p),Za(),i.memoizedState=null):(e!==null&&Yl(i,null),xf(),Za());return Ln(e,i,f,s),i.child}function Lo(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function q0(e,i,s,l,f){var p=df();return p=p===null?null:{parent:vn._currentValue,pool:p},i.memoizedState={baseLanes:s,cachePool:p},e!==null&&Yl(i,null),xf(),Km(i),e!==null&&lr(e,i,l,!0),i.childLanes=f,null}function cc(e,i){return i=fc({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function Y0(e,i,s){return Us(i,e.child,null,s),e=cc(i,i.pendingProps),e.flags|=2,li(i),i.memoizedState=null,e}function ey(e,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Te){if(l.mode==="hidden")return e=cc(i,l),i.lanes=536870912,Lo(null,e);if(yf(i),(e=en)?(e=sv(e,Mi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ha!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},s=Dm(e),s.return=i,i.child=s,Dn=i,en=null)):e=null,e===null)throw Va(i);return i.lanes=536870912,null}return cc(i,l)}var p=e.memoizedState;if(p!==null){var M=p.dehydrated;if(yf(i),f)if(i.flags&256)i.flags&=-257,i=Y0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(xn||lr(e,i,s,!1),f=(s&e.childLanes)!==0,xn||f){if(l=Qe,l!==null&&(M=ii(l,s),M!==0&&M!==p.retryLane))throw p.retryLane=M,bs(e,M),$n(l,e,M),Vf;Sc(),i=Y0(e,i,s)}else e=p.treeContext,en=Ei(M.nextSibling),Dn=i,Te=!0,Ga=null,Mi=!1,e!==null&&Nm(i,e),i=cc(i,l),i.flags|=4096;return i}return e=la(e.child,{mode:l.mode,children:l.children}),e.ref=i.ref,i.child=e,e.return=i,e}function uc(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function kf(e,i,s,l,f){return ws(i),s=bf(e,i,s,l,void 0,f),l=Ef(),e!==null&&!xn?(Tf(e,i,f),pa(e,i,f)):(Te&&l&&af(i),i.flags|=1,Ln(e,i,s,f),i.child)}function Z0(e,i,s,l,f,p){return ws(i),i.updateQueue=null,s=Qm(i,l,s,f),Jm(e),l=Ef(),e!==null&&!xn?(Tf(e,i,p),pa(e,i,p)):(Te&&l&&af(i),i.flags|=1,Ln(e,i,s,p),i.child)}function K0(e,i,s,l,f){if(ws(i),i.stateNode===null){var p=ar,M=s.contextType;typeof M=="object"&&M!==null&&(p=Un(M)),p=new s(l,p),i.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,p.updater=Hf,i.stateNode=p,p._reactInternals=i,p=i.stateNode,p.props=l,p.state=i.memoizedState,p.refs={},mf(i),M=s.contextType,p.context=typeof M=="object"&&M!==null?Un(M):ar,p.state=i.memoizedState,M=s.getDerivedStateFromProps,typeof M=="function"&&(Ff(i,s,M,l),p.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(M=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),M!==p.state&&Hf.enqueueReplaceState(p,p.state,null),wo(i,l,p,f),Ao(),p.state=i.memoizedState),typeof p.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){p=i.stateNode;var D=i.memoizedProps,V=Ns(s,D);p.props=V;var ft=p.context,xt=s.contextType;M=ar,typeof xt=="object"&&xt!==null&&(M=Un(xt));var Mt=s.getDerivedStateFromProps;xt=typeof Mt=="function"||typeof p.getSnapshotBeforeUpdate=="function",D=i.pendingProps!==D,xt||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(D||ft!==M)&&P0(i,p,l,M),Xa=!1;var ht=i.memoizedState;p.state=ht,wo(i,l,p,f),Ao(),ft=i.memoizedState,D||ht!==ft||Xa?(typeof Mt=="function"&&(Ff(i,s,Mt,l),ft=i.memoizedState),(V=Xa||O0(i,s,V,l,ht,ft,M))?(xt||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount()),typeof p.componentDidMount=="function"&&(i.flags|=4194308)):(typeof p.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=ft),p.props=l,p.state=ft,p.context=M,l=V):(typeof p.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{p=i.stateNode,gf(e,i),M=i.memoizedProps,xt=Ns(s,M),p.props=xt,Mt=i.pendingProps,ht=p.context,ft=s.contextType,V=ar,typeof ft=="object"&&ft!==null&&(V=Un(ft)),D=s.getDerivedStateFromProps,(ft=typeof D=="function"||typeof p.getSnapshotBeforeUpdate=="function")||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(M!==Mt||ht!==V)&&P0(i,p,l,V),Xa=!1,ht=i.memoizedState,p.state=ht,wo(i,l,p,f),Ao();var mt=i.memoizedState;M!==Mt||ht!==mt||Xa||e!==null&&e.dependencies!==null&&Wl(e.dependencies)?(typeof D=="function"&&(Ff(i,s,D,l),mt=i.memoizedState),(xt=Xa||O0(i,s,xt,l,ht,mt,V)||e!==null&&e.dependencies!==null&&Wl(e.dependencies))?(ft||typeof p.UNSAFE_componentWillUpdate!="function"&&typeof p.componentWillUpdate!="function"||(typeof p.componentWillUpdate=="function"&&p.componentWillUpdate(l,mt,V),typeof p.UNSAFE_componentWillUpdate=="function"&&p.UNSAFE_componentWillUpdate(l,mt,V)),typeof p.componentDidUpdate=="function"&&(i.flags|=4),typeof p.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof p.componentDidUpdate!="function"||M===e.memoizedProps&&ht===e.memoizedState||(i.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ht===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=mt),p.props=l,p.state=mt,p.context=V,l=xt):(typeof p.componentDidUpdate!="function"||M===e.memoizedProps&&ht===e.memoizedState||(i.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ht===e.memoizedState||(i.flags|=1024),l=!1)}return p=l,uc(e,i),l=(i.flags&128)!==0,p||l?(p=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:p.render(),i.flags|=1,e!==null&&l?(i.child=Us(i,e.child,null,f),i.child=Us(i,null,s,f)):Ln(e,i,s,f),i.memoizedState=p.state,e=i.child):e=pa(e,i,f),e}function J0(e,i,s,l){return Ts(),i.flags|=256,Ln(e,i,s,l),i.child}var Xf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Wf(e){return{baseLanes:e,cachePool:Fm()}}function qf(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=ui),e}function Q0(e,i,s){var l=i.pendingProps,f=!1,p=(i.flags&128)!==0,M;if((M=p)||(M=e!==null&&e.memoizedState===null?!1:(fn.current&2)!==0),M&&(f=!0,i.flags&=-129),M=(i.flags&32)!==0,i.flags&=-33,e===null){if(Te){if(f?Ya(i):Za(),(e=en)?(e=sv(e,Mi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ha!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},s=Dm(e),s.return=i,i.child=s,Dn=i,en=null)):e=null,e===null)throw Va(i);return Rh(e)?i.lanes=32:i.lanes=536870912,null}var D=l.children;return l=l.fallback,f?(Za(),f=i.mode,D=fc({mode:"hidden",children:D},f),l=Es(l,f,s,null),D.return=i,l.return=i,D.sibling=l,i.child=D,l=i.child,l.memoizedState=Wf(s),l.childLanes=qf(e,M,s),i.memoizedState=Xf,Lo(null,l)):(Ya(i),Yf(i,D))}var V=e.memoizedState;if(V!==null&&(D=V.dehydrated,D!==null)){if(p)i.flags&256?(Ya(i),i.flags&=-257,i=Zf(e,i,s)):i.memoizedState!==null?(Za(),i.child=e.child,i.flags|=128,i=null):(Za(),D=l.fallback,f=i.mode,l=fc({mode:"visible",children:l.children},f),D=Es(D,f,s,null),D.flags|=2,l.return=i,D.return=i,l.sibling=D,i.child=l,Us(i,e.child,null,s),l=i.child,l.memoizedState=Wf(s),l.childLanes=qf(e,M,s),i.memoizedState=Xf,i=Lo(null,l));else if(Ya(i),Rh(D)){if(M=D.nextSibling&&D.nextSibling.dataset,M)var ft=M.dgst;M=ft,l=Error(a(419)),l.stack="",l.digest=M,So({value:l,source:null,stack:null}),i=Zf(e,i,s)}else if(xn||lr(e,i,s,!1),M=(s&e.childLanes)!==0,xn||M){if(M=Qe,M!==null&&(l=ii(M,s),l!==0&&l!==V.retryLane))throw V.retryLane=l,bs(e,l),$n(M,e,l),Vf;wh(D)||Sc(),i=Zf(e,i,s)}else wh(D)?(i.flags|=192,i.child=e.child,i=null):(e=V.treeContext,en=Ei(D.nextSibling),Dn=i,Te=!0,Ga=null,Mi=!1,e!==null&&Nm(i,e),i=Yf(i,l.children),i.flags|=4096);return i}return f?(Za(),D=l.fallback,f=i.mode,V=e.child,ft=V.sibling,l=la(V,{mode:"hidden",children:l.children}),l.subtreeFlags=V.subtreeFlags&65011712,ft!==null?D=la(ft,D):(D=Es(D,f,s,null),D.flags|=2),D.return=i,l.return=i,l.sibling=D,i.child=l,Lo(null,l),l=i.child,D=e.child.memoizedState,D===null?D=Wf(s):(f=D.cachePool,f!==null?(V=vn._currentValue,f=f.parent!==V?{parent:V,pool:V}:f):f=Fm(),D={baseLanes:D.baseLanes|s,cachePool:f}),l.memoizedState=D,l.childLanes=qf(e,M,s),i.memoizedState=Xf,Lo(e.child,l)):(Ya(i),s=e.child,e=s.sibling,s=la(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,e!==null&&(M=i.deletions,M===null?(i.deletions=[e],i.flags|=16):M.push(e)),i.child=s,i.memoizedState=null,s)}function Yf(e,i){return i=fc({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function fc(e,i){return e=ri(22,e,null,i),e.lanes=0,e}function Zf(e,i,s){return Us(i,e.child,null,s),e=Yf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function j0(e,i,s){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),cf(e.return,i,s)}function Kf(e,i,s,l,f,p){var M=e.memoizedState;M===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:p}:(M.isBackwards=i,M.rendering=null,M.renderingStartTime=0,M.last=l,M.tail=s,M.tailMode=f,M.treeForkCount=p)}function $0(e,i,s){var l=i.pendingProps,f=l.revealOrder,p=l.tail;l=l.children;var M=fn.current,D=(M&2)!==0;if(D?(M=M&1|2,i.flags|=128):M&=1,Q(fn,M),Ln(e,i,l,s),l=Te?xo:0,!D&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&j0(e,s,i);else if(e.tag===19)j0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)e=s.alternate,e!==null&&$l(e)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),Kf(i,!1,f,s,p,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(e=f.alternate,e!==null&&$l(e)===null){i.child=f;break}e=f.sibling,f.sibling=s,s=f,f=e}Kf(i,!0,s,null,p,l);break;case"together":Kf(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function pa(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),Qa|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(lr(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=la(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=la(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Jf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Wl(e)))}function ny(e,i,s){switch(i.tag){case 3:pt(i,i.stateNode.containerInfo),ka(i,vn,e.memoizedState.cache),Ts();break;case 27:case 5:It(i);break;case 4:pt(i,i.stateNode.containerInfo);break;case 10:ka(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,yf(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(Ya(i),i.flags|=128,null):(s&i.child.childLanes)!==0?Q0(e,i,s):(Ya(i),e=pa(e,i,s),e!==null?e.sibling:null);Ya(i);break;case 19:var f=(e.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(lr(e,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return $0(e,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),Q(fn,fn.current),l)break;return null;case 22:return i.lanes=0,W0(e,i,s,i.pendingProps);case 24:ka(i,vn,e.memoizedState.cache)}return pa(e,i,s)}function tg(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)xn=!0;else{if(!Jf(e,s)&&(i.flags&128)===0)return xn=!1,ny(e,i,s);xn=(e.flags&131072)!==0}else xn=!1,Te&&(i.flags&1048576)!==0&&Lm(i,xo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var l=i.pendingProps;if(e=Cs(i.elementType),i.type=e,typeof e=="function")tf(e)?(l=Ns(e,l),i.tag=1,i=K0(null,i,e,l,s)):(i.tag=0,i=kf(null,i,e,l,s));else{if(e!=null){var f=e.$$typeof;if(f===A){i.tag=11,i=V0(null,i,e,l,s);break t}else if(f===I){i.tag=14,i=k0(null,i,e,l,s);break t}}throw i=k(e)||e,Error(a(306,i,""))}}return i;case 0:return kf(e,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=Ns(l,i.pendingProps),K0(e,i,l,f,s);case 3:t:{if(pt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));l=i.pendingProps;var p=i.memoizedState;f=p.element,gf(e,i),wo(i,l,null,s);var M=i.memoizedState;if(l=M.cache,ka(i,vn,l),l!==p.cache&&uf(i,[vn],s,!0),Ao(),l=M.element,p.isDehydrated)if(p={element:l,isDehydrated:!1,cache:M.cache},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){i=J0(e,i,l,s);break t}else if(l!==f){f=xi(Error(a(424)),i),So(f),i=J0(e,i,l,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(en=Ei(e.firstChild),Dn=i,Te=!0,Ga=null,Mi=!0,s=Wm(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Ts(),l===f){i=pa(e,i,s);break t}Ln(e,i,l,s)}i=i.child}return i;case 26:return uc(e,i),e===null?(s=fv(i.type,null,i.pendingProps,null))?i.memoizedState=s:Te||(s=i.type,e=i.pendingProps,l=wc(wt.current).createElement(s),l[pn]=i,l[Cn]=e,Nn(l,s,e),mn(l),i.stateNode=l):i.memoizedState=fv(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return It(i),e===null&&Te&&(l=i.stateNode=lv(i.type,i.pendingProps,wt.current),Dn=i,Mi=!0,f=en,ns(i.type)?(Ch=f,en=Ei(l.firstChild)):en=f),Ln(e,i,i.pendingProps.children,s),uc(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Te&&((f=l=en)&&(l=Ly(l,i.type,i.pendingProps,Mi),l!==null?(i.stateNode=l,Dn=i,en=Ei(l.firstChild),Mi=!1,f=!0):f=!1),f||Va(i)),It(i),f=i.type,p=i.pendingProps,M=e!==null?e.memoizedProps:null,l=p.children,Eh(f,p)?l=null:M!==null&&Eh(f,M)&&(i.flags|=32),i.memoizedState!==null&&(f=bf(e,i,YS,null,null,s),Yo._currentValue=f),uc(e,i),Ln(e,i,l,s),i.child;case 6:return e===null&&Te&&((e=s=en)&&(s=Ny(s,i.pendingProps,Mi),s!==null?(i.stateNode=s,Dn=i,en=null,e=!0):e=!1),e||Va(i)),null;case 13:return Q0(e,i,s);case 4:return pt(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=Us(i,null,l,s):Ln(e,i,l,s),i.child;case 11:return V0(e,i,i.type,i.pendingProps,s);case 7:return Ln(e,i,i.pendingProps,s),i.child;case 8:return Ln(e,i,i.pendingProps.children,s),i.child;case 12:return Ln(e,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,ka(i,i.type,l.value),Ln(e,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,ws(i),f=Un(f),l=l(f),i.flags|=1,Ln(e,i,l,s),i.child;case 14:return k0(e,i,i.type,i.pendingProps,s);case 15:return X0(e,i,i.type,i.pendingProps,s);case 19:return $0(e,i,s);case 31:return ey(e,i,s);case 22:return W0(e,i,s,i.pendingProps);case 24:return ws(i),l=Un(vn),e===null?(f=df(),f===null&&(f=Qe,p=ff(),f.pooledCache=p,p.refCount++,p!==null&&(f.pooledCacheLanes|=s),f=p),i.memoizedState={parent:l,cache:f},mf(i),ka(i,vn,f)):((e.lanes&s)!==0&&(gf(e,i),wo(i,null,null,s),Ao()),f=e.memoizedState,p=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),ka(i,vn,l)):(l=p.cache,ka(i,vn,l),l!==f.cache&&uf(i,[vn],s,!0))),Ln(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function ma(e){e.flags|=4}function Qf(e,i,s,l,f){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(f&335544128)===f)if(e.stateNode.complete)e.flags|=8192;else if(wg())e.flags|=8192;else throw Ds=Kl,pf}else e.flags&=-16777217}function eg(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!gv(i))if(wg())e.flags|=8192;else throw Ds=Kl,pf}function hc(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Et():536870912,e.lanes|=i,Sr|=i)}function No(e,i){if(!Te)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function nn(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,l=0;if(i)for(var f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=l,e.childLanes=s,i}function iy(e,i,s){var l=i.pendingProps;switch(sf(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return nn(i),null;case 1:return nn(i),null;case 3:return s=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),fa(vn),Tt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(or(i)?ma(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,of())),nn(i),null;case 26:var f=i.type,p=i.memoizedState;return e===null?(ma(i),p!==null?(nn(i),eg(i,p)):(nn(i),Qf(i,f,null,l,s))):p?p!==e.memoizedState?(ma(i),nn(i),eg(i,p)):(nn(i),i.flags&=-16777217):(e=e.memoizedProps,e!==l&&ma(i),nn(i),Qf(i,f,e,l,s)),null;case 27:if(At(i),s=wt.current,f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&ma(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return nn(i),null}e=j.current,or(i)?Om(i):(e=lv(f,l,s),i.stateNode=e,ma(i))}return nn(i),null;case 5:if(At(i),f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&ma(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return nn(i),null}if(p=j.current,or(i))Om(i);else{var M=wc(wt.current);switch(p){case 1:p=M.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:p=M.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":p=M.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":p=M.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":p=M.createElement("div"),p.innerHTML="<script><\/script>",p=p.removeChild(p.firstChild);break;case"select":p=typeof l.is=="string"?M.createElement("select",{is:l.is}):M.createElement("select"),l.multiple?p.multiple=!0:l.size&&(p.size=l.size);break;default:p=typeof l.is=="string"?M.createElement(f,{is:l.is}):M.createElement(f)}}p[pn]=i,p[Cn]=l;t:for(M=i.child;M!==null;){if(M.tag===5||M.tag===6)p.appendChild(M.stateNode);else if(M.tag!==4&&M.tag!==27&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===i)break t;for(;M.sibling===null;){if(M.return===null||M.return===i)break t;M=M.return}M.sibling.return=M.return,M=M.sibling}i.stateNode=p;t:switch(Nn(p,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&ma(i)}}return nn(i),Qf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&ma(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=wt.current,or(i)){if(e=i.stateNode,s=i.memoizedProps,l=null,f=Dn,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}e[pn]=i,e=!!(e.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||Qg(e.nodeValue,s)),e||Va(i,!0)}else e=wc(e).createTextNode(l),e[pn]=i,i.stateNode=e}return nn(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(l=or(i),s!==null){if(e===null){if(!l)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[pn]=i}else Ts(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;nn(i),e=!1}else s=of(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(li(i),i):(li(i),null);if((i.flags&128)!==0)throw Error(a(558))}return nn(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(f=or(i),l!==null&&l.dehydrated!==null){if(e===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[pn]=i}else Ts(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;nn(i),f=!1}else f=of(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(li(i),i):(li(i),null)}return li(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,e=e!==null&&e.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),p=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(p=l.memoizedState.cachePool.pool),p!==f&&(l.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),hc(i,i.updateQueue),nn(i),null);case 4:return Tt(),e===null&&xh(i.stateNode.containerInfo),nn(i),null;case 10:return fa(i.type),nn(i),null;case 19:if(et(fn),l=i.memoizedState,l===null)return nn(i),null;if(f=(i.flags&128)!==0,p=l.rendering,p===null)if(f)No(l,!1);else{if(un!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(p=$l(e),p!==null){for(i.flags|=128,No(l,!1),e=p.updateQueue,i.updateQueue=e,hc(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)Cm(s,e),s=s.sibling;return Q(fn,fn.current&1|2),Te&&ca(i,l.treeForkCount),i.child}e=e.sibling}l.tail!==null&&De()>vc&&(i.flags|=128,f=!0,No(l,!1),i.lanes=4194304)}else{if(!f)if(e=$l(p),e!==null){if(i.flags|=128,f=!0,e=e.updateQueue,i.updateQueue=e,hc(i,e),No(l,!0),l.tail===null&&l.tailMode==="hidden"&&!p.alternate&&!Te)return nn(i),null}else 2*De()-l.renderingStartTime>vc&&s!==536870912&&(i.flags|=128,f=!0,No(l,!1),i.lanes=4194304);l.isBackwards?(p.sibling=i.child,i.child=p):(e=l.last,e!==null?e.sibling=p:i.child=p,l.last=p)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=De(),e.sibling=null,s=fn.current,Q(fn,f?s&1|2:s&1),Te&&ca(i,l.treeForkCount),e):(nn(i),null);case 22:case 23:return li(i),Sf(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(nn(i),i.subtreeFlags&6&&(i.flags|=8192)):nn(i),s=i.updateQueue,s!==null&&hc(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),e!==null&&et(Rs),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),fa(vn),nn(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function ay(e,i){switch(sf(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return fa(vn),Tt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return At(i),null;case 31:if(i.memoizedState!==null){if(li(i),i.alternate===null)throw Error(a(340));Ts()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(li(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));Ts()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return et(fn),null;case 4:return Tt(),null;case 10:return fa(i.type),null;case 22:case 23:return li(i),Sf(),e!==null&&et(Rs),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return fa(vn),null;case 25:return null;default:return null}}function ng(e,i){switch(sf(i),i.tag){case 3:fa(vn),Tt();break;case 26:case 27:case 5:At(i);break;case 4:Tt();break;case 31:i.memoizedState!==null&&li(i);break;case 13:li(i);break;case 19:et(fn);break;case 10:fa(i.type);break;case 22:case 23:li(i),Sf(),e!==null&&et(Rs);break;case 24:fa(vn)}}function Oo(e,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&e)===e){l=void 0;var p=s.create,M=s.inst;l=p(),M.destroy=l}s=s.next}while(s!==f)}}catch(D){ke(i,i.return,D)}}function Ka(e,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var p=f.next;l=p;do{if((l.tag&e)===e){var M=l.inst,D=M.destroy;if(D!==void 0){M.destroy=void 0,f=i;var V=s,ft=D;try{ft()}catch(xt){ke(f,V,xt)}}}l=l.next}while(l!==p)}}catch(xt){ke(i,i.return,xt)}}function ig(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{Ym(i,s)}catch(l){ke(e,e.return,l)}}}function ag(e,i,s){s.props=Ns(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(l){ke(e,i,l)}}function Po(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof s=="function"?e.refCleanup=s(l):s.current=l}}catch(f){ke(e,i,f)}}function Zi(e,i){var s=e.ref,l=e.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){ke(e,i,f)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){ke(e,i,f)}else s.current=null}function sg(e){var i=e.type,s=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break t;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){ke(e,e.return,f)}}function jf(e,i,s){try{var l=e.stateNode;Ay(l,e.type,s,i),l[Cn]=i}catch(f){ke(e,e.return,f)}}function rg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ns(e.type)||e.tag===4}function $f(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||rg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ns(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function th(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=vi));else if(l!==4&&(l===27&&ns(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(th(e,i,s),e=e.sibling;e!==null;)th(e,i,s),e=e.sibling}function dc(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(l!==4&&(l===27&&ns(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(dc(e,i,s),e=e.sibling;e!==null;)dc(e,i,s),e=e.sibling}function og(e){var i=e.stateNode,s=e.memoizedProps;try{for(var l=e.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);Nn(i,l,s),i[pn]=e,i[Cn]=s}catch(p){ke(e,e.return,p)}}var ga=!1,Sn=!1,eh=!1,lg=typeof WeakSet=="function"?WeakSet:Set,wn=null;function sy(e,i){if(e=e.containerInfo,Mh=Oc,e=Sm(e),Yu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,p=l.focusNode;l=l.focusOffset;try{s.nodeType,p.nodeType}catch{s=null;break t}var M=0,D=-1,V=-1,ft=0,xt=0,Mt=e,ht=null;e:for(;;){for(var mt;Mt!==s||f!==0&&Mt.nodeType!==3||(D=M+f),Mt!==p||l!==0&&Mt.nodeType!==3||(V=M+l),Mt.nodeType===3&&(M+=Mt.nodeValue.length),(mt=Mt.firstChild)!==null;)ht=Mt,Mt=mt;for(;;){if(Mt===e)break e;if(ht===s&&++ft===f&&(D=M),ht===p&&++xt===l&&(V=M),(mt=Mt.nextSibling)!==null)break;Mt=ht,ht=Mt.parentNode}Mt=mt}s=D===-1||V===-1?null:{start:D,end:V}}else s=null}s=s||{start:0,end:0}}else s=null;for(bh={focusedElem:e,selectionRange:s},Oc=!1,wn=i;wn!==null;)if(i=wn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,wn=e;else for(;wn!==null;){switch(i=wn,p=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)f=e[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&p!==null){e=void 0,s=i,f=p.memoizedProps,p=p.memoizedState,l=s.stateNode;try{var Zt=Ns(s.type,f);e=l.getSnapshotBeforeUpdate(Zt,p),l.__reactInternalSnapshotBeforeUpdate=e}catch(ie){ke(s,s.return,ie)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)Ah(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ah(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,wn=e;break}wn=i.return}}function cg(e,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:_a(e,s),l&4&&Oo(5,s);break;case 1:if(_a(e,s),l&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(M){ke(s,s.return,M)}else{var f=Ns(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(f,i,e.__reactInternalSnapshotBeforeUpdate)}catch(M){ke(s,s.return,M)}}l&64&&ig(s),l&512&&Po(s,s.return);break;case 3:if(_a(e,s),l&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{Ym(e,i)}catch(M){ke(s,s.return,M)}}break;case 27:i===null&&l&4&&og(s);case 26:case 5:_a(e,s),i===null&&l&4&&sg(s),l&512&&Po(s,s.return);break;case 12:_a(e,s);break;case 31:_a(e,s),l&4&&hg(e,s);break;case 13:_a(e,s),l&4&&dg(e,s),l&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=py.bind(null,s),Oy(e,s))));break;case 22:if(l=s.memoizedState!==null||ga,!l){i=i!==null&&i.memoizedState!==null||Sn,f=ga;var p=Sn;ga=l,(Sn=i)&&!p?xa(e,s,(s.subtreeFlags&8772)!==0):_a(e,s),ga=f,Sn=p}break;case 30:break;default:_a(e,s)}}function ug(e){var i=e.alternate;i!==null&&(e.alternate=null,ug(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&Ia(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var rn=null,Kn=!1;function va(e,i,s){for(s=s.child;s!==null;)fg(e,i,s),s=s.sibling}function fg(e,i,s){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(gt,s)}catch{}switch(s.tag){case 26:Sn||Zi(s,i),va(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:Sn||Zi(s,i);var l=rn,f=Kn;ns(s.type)&&(rn=s.stateNode,Kn=!1),va(e,i,s),Xo(s.stateNode),rn=l,Kn=f;break;case 5:Sn||Zi(s,i);case 6:if(l=rn,f=Kn,rn=null,va(e,i,s),rn=l,Kn=f,rn!==null)if(Kn)try{(rn.nodeType===9?rn.body:rn.nodeName==="HTML"?rn.ownerDocument.body:rn).removeChild(s.stateNode)}catch(p){ke(s,i,p)}else try{rn.removeChild(s.stateNode)}catch(p){ke(s,i,p)}break;case 18:rn!==null&&(Kn?(e=rn,iv(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Rr(e)):iv(rn,s.stateNode));break;case 4:l=rn,f=Kn,rn=s.stateNode.containerInfo,Kn=!0,va(e,i,s),rn=l,Kn=f;break;case 0:case 11:case 14:case 15:Ka(2,s,i),Sn||Ka(4,s,i),va(e,i,s);break;case 1:Sn||(Zi(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&ag(s,i,l)),va(e,i,s);break;case 21:va(e,i,s);break;case 22:Sn=(l=Sn)||s.memoizedState!==null,va(e,i,s),Sn=l;break;default:va(e,i,s)}}function hg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Rr(e)}catch(s){ke(i,i.return,s)}}}function dg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Rr(e)}catch(s){ke(i,i.return,s)}}function ry(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new lg),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new lg),i;default:throw Error(a(435,e.tag))}}function pc(e,i){var s=ry(e);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=my.bind(null,e,l);l.then(f,f)}})}function Jn(e,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],p=e,M=i,D=M;t:for(;D!==null;){switch(D.tag){case 27:if(ns(D.type)){rn=D.stateNode,Kn=!1;break t}break;case 5:rn=D.stateNode,Kn=!1;break t;case 3:case 4:rn=D.stateNode.containerInfo,Kn=!0;break t}D=D.return}if(rn===null)throw Error(a(160));fg(p,M,f),rn=null,Kn=!1,p=f.alternate,p!==null&&(p.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)pg(i,e),i=i.sibling}var Ni=null;function pg(e,i){var s=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(i,e),Qn(e),l&4&&(Ka(3,e,e.return),Oo(3,e),Ka(5,e,e.return));break;case 1:Jn(i,e),Qn(e),l&512&&(Sn||s===null||Zi(s,s.return)),l&64&&ga&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=Ni;if(Jn(i,e),Qn(e),l&512&&(Sn||s===null||Zi(s,s.return)),l&4){var p=s!==null?s.memoizedState:null;if(l=e.memoizedState,s===null)if(l===null)if(e.stateNode===null){t:{l=e.type,s=e.memoizedProps,f=f.ownerDocument||f;e:switch(l){case"title":p=f.getElementsByTagName("title")[0],(!p||p[Pa]||p[pn]||p.namespaceURI==="http://www.w3.org/2000/svg"||p.hasAttribute("itemprop"))&&(p=f.createElement(l),f.head.insertBefore(p,f.querySelector("head > title"))),Nn(p,l,s),p[pn]=e,mn(p),l=p;break t;case"link":var M=pv("link","href",f).get(l+(s.href||""));if(M){for(var D=0;D<M.length;D++)if(p=M[D],p.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&p.getAttribute("rel")===(s.rel==null?null:s.rel)&&p.getAttribute("title")===(s.title==null?null:s.title)&&p.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){M.splice(D,1);break e}}p=f.createElement(l),Nn(p,l,s),f.head.appendChild(p);break;case"meta":if(M=pv("meta","content",f).get(l+(s.content||""))){for(D=0;D<M.length;D++)if(p=M[D],p.getAttribute("content")===(s.content==null?null:""+s.content)&&p.getAttribute("name")===(s.name==null?null:s.name)&&p.getAttribute("property")===(s.property==null?null:s.property)&&p.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&p.getAttribute("charset")===(s.charSet==null?null:s.charSet)){M.splice(D,1);break e}}p=f.createElement(l),Nn(p,l,s),f.head.appendChild(p);break;default:throw Error(a(468,l))}p[pn]=e,mn(p),l=p}e.stateNode=l}else mv(f,e.type,e.stateNode);else e.stateNode=dv(f,l,e.memoizedProps);else p!==l?(p===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):p.count--,l===null?mv(f,e.type,e.stateNode):dv(f,l,e.memoizedProps)):l===null&&e.stateNode!==null&&jf(e,e.memoizedProps,s.memoizedProps)}break;case 27:Jn(i,e),Qn(e),l&512&&(Sn||s===null||Zi(s,s.return)),s!==null&&l&4&&jf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Jn(i,e),Qn(e),l&512&&(Sn||s===null||Zi(s,s.return)),e.flags&32){f=e.stateNode;try{Gn(f,"")}catch(Zt){ke(e,e.return,Zt)}}l&4&&e.stateNode!=null&&(f=e.memoizedProps,jf(e,f,s!==null?s.memoizedProps:f)),l&1024&&(eh=!0);break;case 6:if(Jn(i,e),Qn(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,s=e.stateNode;try{s.nodeValue=l}catch(Zt){ke(e,e.return,Zt)}}break;case 3:if(Dc=null,f=Ni,Ni=Rc(i.containerInfo),Jn(i,e),Ni=f,Qn(e),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Rr(i.containerInfo)}catch(Zt){ke(e,e.return,Zt)}eh&&(eh=!1,mg(e));break;case 4:l=Ni,Ni=Rc(e.stateNode.containerInfo),Jn(i,e),Qn(e),Ni=l;break;case 12:Jn(i,e),Qn(e);break;case 31:Jn(i,e),Qn(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,pc(e,l)));break;case 13:Jn(i,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(gc=De()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,pc(e,l)));break;case 22:f=e.memoizedState!==null;var V=s!==null&&s.memoizedState!==null,ft=ga,xt=Sn;if(ga=ft||f,Sn=xt||V,Jn(i,e),Sn=xt,ga=ft,Qn(e),l&8192)t:for(i=e.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||V||ga||Sn||Os(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){V=s=i;try{if(p=V.stateNode,f)M=p.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{D=V.stateNode;var Mt=V.memoizedProps.style,ht=Mt!=null&&Mt.hasOwnProperty("display")?Mt.display:null;D.style.display=ht==null||typeof ht=="boolean"?"":(""+ht).trim()}}catch(Zt){ke(V,V.return,Zt)}}}else if(i.tag===6){if(s===null){V=i;try{V.stateNode.nodeValue=f?"":V.memoizedProps}catch(Zt){ke(V,V.return,Zt)}}}else if(i.tag===18){if(s===null){V=i;try{var mt=V.stateNode;f?av(mt,!0):av(V.stateNode,!1)}catch(Zt){ke(V,V.return,Zt)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,pc(e,s))));break;case 19:Jn(i,e),Qn(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,pc(e,l)));break;case 30:break;case 21:break;default:Jn(i,e),Qn(e)}}function Qn(e){var i=e.flags;if(i&2){try{for(var s,l=e.return;l!==null;){if(rg(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,p=$f(e);dc(e,p,f);break;case 5:var M=s.stateNode;s.flags&32&&(Gn(M,""),s.flags&=-33);var D=$f(e);dc(e,D,M);break;case 3:case 4:var V=s.stateNode.containerInfo,ft=$f(e);th(e,ft,V);break;default:throw Error(a(161))}}catch(xt){ke(e,e.return,xt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function mg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;mg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function _a(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)cg(e,i.alternate,i),i=i.sibling}function Os(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Ka(4,i,i.return),Os(i);break;case 1:Zi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&ag(i,i.return,s),Os(i);break;case 27:Xo(i.stateNode);case 26:case 5:Zi(i,i.return),Os(i);break;case 22:i.memoizedState===null&&Os(i);break;case 30:Os(i);break;default:Os(i)}e=e.sibling}}function xa(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=e,p=i,M=p.flags;switch(p.tag){case 0:case 11:case 15:xa(f,p,s),Oo(4,p);break;case 1:if(xa(f,p,s),l=p,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(ft){ke(l,l.return,ft)}if(l=p,f=l.updateQueue,f!==null){var D=l.stateNode;try{var V=f.shared.hiddenCallbacks;if(V!==null)for(f.shared.hiddenCallbacks=null,f=0;f<V.length;f++)qm(V[f],D)}catch(ft){ke(l,l.return,ft)}}s&&M&64&&ig(p),Po(p,p.return);break;case 27:og(p);case 26:case 5:xa(f,p,s),s&&l===null&&M&4&&sg(p),Po(p,p.return);break;case 12:xa(f,p,s);break;case 31:xa(f,p,s),s&&M&4&&hg(f,p);break;case 13:xa(f,p,s),s&&M&4&&dg(f,p);break;case 22:p.memoizedState===null&&xa(f,p,s),Po(p,p.return);break;case 30:break;default:xa(f,p,s)}i=i.sibling}}function nh(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&yo(s))}function ih(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&yo(e))}function Oi(e,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)gg(e,i,s,l),i=i.sibling}function gg(e,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Oi(e,i,s,l),f&2048&&Oo(9,i);break;case 1:Oi(e,i,s,l);break;case 3:Oi(e,i,s,l),f&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&yo(e)));break;case 12:if(f&2048){Oi(e,i,s,l),e=i.stateNode;try{var p=i.memoizedProps,M=p.id,D=p.onPostCommit;typeof D=="function"&&D(M,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(V){ke(i,i.return,V)}}else Oi(e,i,s,l);break;case 31:Oi(e,i,s,l);break;case 13:Oi(e,i,s,l);break;case 23:break;case 22:p=i.stateNode,M=i.alternate,i.memoizedState!==null?p._visibility&2?Oi(e,i,s,l):Io(e,i):p._visibility&2?Oi(e,i,s,l):(p._visibility|=2,vr(e,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&nh(M,i);break;case 24:Oi(e,i,s,l),f&2048&&ih(i.alternate,i);break;default:Oi(e,i,s,l)}}function vr(e,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var p=e,M=i,D=s,V=l,ft=M.flags;switch(M.tag){case 0:case 11:case 15:vr(p,M,D,V,f),Oo(8,M);break;case 23:break;case 22:var xt=M.stateNode;M.memoizedState!==null?xt._visibility&2?vr(p,M,D,V,f):Io(p,M):(xt._visibility|=2,vr(p,M,D,V,f)),f&&ft&2048&&nh(M.alternate,M);break;case 24:vr(p,M,D,V,f),f&&ft&2048&&ih(M.alternate,M);break;default:vr(p,M,D,V,f)}i=i.sibling}}function Io(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,l=i,f=l.flags;switch(l.tag){case 22:Io(s,l),f&2048&&nh(l.alternate,l);break;case 24:Io(s,l),f&2048&&ih(l.alternate,l);break;default:Io(s,l)}i=i.sibling}}var zo=8192;function _r(e,i,s){if(e.subtreeFlags&zo)for(e=e.child;e!==null;)vg(e,i,s),e=e.sibling}function vg(e,i,s){switch(e.tag){case 26:_r(e,i,s),e.flags&zo&&e.memoizedState!==null&&qy(s,Ni,e.memoizedState,e.memoizedProps);break;case 5:_r(e,i,s);break;case 3:case 4:var l=Ni;Ni=Rc(e.stateNode.containerInfo),_r(e,i,s),Ni=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=zo,zo=16777216,_r(e,i,s),zo=l):_r(e,i,s));break;default:_r(e,i,s)}}function _g(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Bo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];wn=l,Sg(l,e)}_g(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)xg(e),e=e.sibling}function xg(e){switch(e.tag){case 0:case 11:case 15:Bo(e),e.flags&2048&&Ka(9,e,e.return);break;case 3:Bo(e);break;case 12:Bo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,mc(e)):Bo(e);break;default:Bo(e)}}function mc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];wn=l,Sg(l,e)}_g(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Ka(8,i,i.return),mc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,mc(i));break;default:mc(i)}e=e.sibling}}function Sg(e,i){for(;wn!==null;){var s=wn;switch(s.tag){case 0:case 11:case 15:Ka(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:yo(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,wn=l;else t:for(s=e;wn!==null;){l=wn;var f=l.sibling,p=l.return;if(ug(l),l===s){wn=null;break t}if(f!==null){f.return=p,wn=f;break t}wn=p}}}var oy={getCacheForType:function(e){var i=Un(vn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Un(vn).controller.signal}},ly=typeof WeakMap=="function"?WeakMap:Map,He=0,Qe=null,xe=null,ye=0,Ve=0,ci=null,Ja=!1,xr=!1,ah=!1,Sa=0,un=0,Qa=0,Ps=0,sh=0,ui=0,Sr=0,Fo=null,jn=null,rh=!1,gc=0,yg=0,vc=1/0,_c=null,ja=null,En=0,$a=null,yr=null,ya=0,oh=0,lh=null,Mg=null,Ho=0,ch=null;function fi(){return(He&2)!==0&&ye!==0?ye&-ye:B.T!==null?mh():oo()}function bg(){if(ui===0)if((ye&536870912)===0||Te){var e=se;se<<=1,(se&3932160)===0&&(se=262144),ui=e}else ui=536870912;return e=oi.current,e!==null&&(e.flags|=32),ui}function $n(e,i,s){(e===Qe&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)&&(Mr(e,0),ts(e,ye,ui,!1)),qt(e,s),((He&2)===0||e!==Qe)&&(e===Qe&&((He&2)===0&&(Ps|=s),un===4&&ts(e,ye,ui,!1)),Ki(e))}function Eg(e,i,s){if((He&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&e.expiredLanes)===0||Lt(e,i),f=l?fy(e,i):fh(e,i,!0),p=l;do{if(f===0){xr&&!l&&ts(e,i,0,!1);break}else{if(s=e.current.alternate,p&&!cy(s)){f=fh(e,i,!1),p=!1;continue}if(f===2){if(p=i,e.errorRecoveryDisabledLanes&p)var M=0;else M=e.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){i=M;t:{var D=e;f=Fo;var V=D.current.memoizedState.isDehydrated;if(V&&(Mr(D,M).flags|=256),M=fh(D,M,!1),M!==2){if(ah&&!V){D.errorRecoveryDisabledLanes|=p,Ps|=p,f=4;break t}p=jn,jn=f,p!==null&&(jn===null?jn=p:jn.push.apply(jn,p))}f=M}if(p=!1,f!==2)continue}}if(f===1){Mr(e,0),ts(e,i,0,!0);break}t:{switch(l=e,p=f,p){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:ts(l,i,ui,!Ja);break t;case 2:jn=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=gc+300-De(),10<f)){if(ts(l,i,ui,!Ja),St(l,0,!0)!==0)break t;ya=i,l.timeoutHandle=ev(Tg.bind(null,l,s,jn,_c,rh,i,ui,Ps,Sr,Ja,p,"Throttled",-0,0),f);break t}Tg(l,s,jn,_c,rh,i,ui,Ps,Sr,Ja,p,null,-0,0)}}break}while(!0);Ki(e)}function Tg(e,i,s,l,f,p,M,D,V,ft,xt,Mt,ht,mt){if(e.timeoutHandle=-1,Mt=i.subtreeFlags,Mt&8192||(Mt&16785408)===16785408){Mt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:vi},vg(i,p,Mt);var Zt=(p&62914560)===p?gc-De():(p&4194048)===p?yg-De():0;if(Zt=Yy(Mt,Zt),Zt!==null){ya=p,e.cancelPendingCommit=Zt(Ng.bind(null,e,i,p,s,l,f,M,D,V,xt,Mt,null,ht,mt)),ts(e,p,M,!ft);return}}Ng(e,i,p,s,l,f,M,D,V)}function cy(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],p=f.getSnapshot;f=f.value;try{if(!si(p(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ts(e,i,s,l){i&=~sh,i&=~Ps,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var f=i;0<f;){var p=31-Vt(f),M=1<<p;l[p]=-1,f&=~M}s!==0&&Ue(e,s,i)}function xc(){return(He&6)===0?(Go(0),!1):!0}function uh(){if(xe!==null){if(Ve===0)var e=xe.return;else e=xe,ua=As=null,Af(e),hr=null,bo=0,e=xe;for(;e!==null;)ng(e.alternate,e),e=e.return;xe=null}}function Mr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,Cy(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ya=0,uh(),Qe=e,xe=s=la(e.current,null),ye=i,Ve=0,ci=null,Ja=!1,xr=Lt(e,i),ah=!1,Sr=ui=sh=Ps=Qa=un=0,jn=Fo=null,rh=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var f=31-Vt(l),p=1<<f;i|=e[f],l&=~p}return Sa=i,Hl(),s}function Ag(e,i){ce=null,B.H=Uo,i===fr||i===Zl?(i=Vm(),Ve=3):i===pf?(i=Vm(),Ve=4):Ve=i===Vf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ci=i,xe===null&&(un=1,lc(e,xi(i,e.current)))}function wg(){var e=oi.current;return e===null?!0:(ye&4194048)===ye?bi===null:(ye&62914560)===ye||(ye&536870912)!==0?e===bi:!1}function Rg(){var e=B.H;return B.H=Uo,e===null?Uo:e}function Cg(){var e=B.A;return B.A=oy,e}function Sc(){un=4,Ja||(ye&4194048)!==ye&&oi.current!==null||(xr=!0),(Qa&134217727)===0&&(Ps&134217727)===0||Qe===null||ts(Qe,ye,ui,!1)}function fh(e,i,s){var l=He;He|=2;var f=Rg(),p=Cg();(Qe!==e||ye!==i)&&(_c=null,Mr(e,i)),i=!1;var M=un;t:do try{if(Ve!==0&&xe!==null){var D=xe,V=ci;switch(Ve){case 8:uh(),M=6;break t;case 3:case 2:case 9:case 6:oi.current===null&&(i=!0);var ft=Ve;if(Ve=0,ci=null,br(e,D,V,ft),s&&xr){M=0;break t}break;default:ft=Ve,Ve=0,ci=null,br(e,D,V,ft)}}uy(),M=un;break}catch(xt){Ag(e,xt)}while(!0);return i&&e.shellSuspendCounter++,ua=As=null,He=l,B.H=f,B.A=p,xe===null&&(Qe=null,ye=0,Hl()),M}function uy(){for(;xe!==null;)Dg(xe)}function fy(e,i){var s=He;He|=2;var l=Rg(),f=Cg();Qe!==e||ye!==i?(_c=null,vc=De()+500,Mr(e,i)):xr=Lt(e,i);t:do try{if(Ve!==0&&xe!==null){i=xe;var p=ci;e:switch(Ve){case 1:Ve=0,ci=null,br(e,i,p,1);break;case 2:case 9:if(Hm(p)){Ve=0,ci=null,Ug(i);break}i=function(){Ve!==2&&Ve!==9||Qe!==e||(Ve=7),Ki(e)},p.then(i,i);break t;case 3:Ve=7;break t;case 4:Ve=5;break t;case 7:Hm(p)?(Ve=0,ci=null,Ug(i)):(Ve=0,ci=null,br(e,i,p,7));break;case 5:var M=null;switch(xe.tag){case 26:M=xe.memoizedState;case 5:case 27:var D=xe;if(M?gv(M):D.stateNode.complete){Ve=0,ci=null;var V=D.sibling;if(V!==null)xe=V;else{var ft=D.return;ft!==null?(xe=ft,yc(ft)):xe=null}break e}}Ve=0,ci=null,br(e,i,p,5);break;case 6:Ve=0,ci=null,br(e,i,p,6);break;case 8:uh(),un=6;break t;default:throw Error(a(462))}}hy();break}catch(xt){Ag(e,xt)}while(!0);return ua=As=null,B.H=l,B.A=f,He=s,xe!==null?0:(Qe=null,ye=0,Hl(),un)}function hy(){for(;xe!==null&&!$e();)Dg(xe)}function Dg(e){var i=tg(e.alternate,e,Sa);e.memoizedProps=e.pendingProps,i===null?yc(e):xe=i}function Ug(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=Z0(s,i,i.pendingProps,i.type,void 0,ye);break;case 11:i=Z0(s,i,i.pendingProps,i.type.render,i.ref,ye);break;case 5:Af(i);default:ng(s,i),i=xe=Cm(i,Sa),i=tg(s,i,Sa)}e.memoizedProps=e.pendingProps,i===null?yc(e):xe=i}function br(e,i,s,l){ua=As=null,Af(i),hr=null,bo=0;var f=i.return;try{if(ty(e,f,i,s,ye)){un=1,lc(e,xi(s,e.current)),xe=null;return}}catch(p){if(f!==null)throw xe=f,p;un=1,lc(e,xi(s,e.current)),xe=null;return}i.flags&32768?(Te||l===1?e=!0:xr||(ye&536870912)!==0?e=!1:(Ja=e=!0,(l===2||l===9||l===3||l===6)&&(l=oi.current,l!==null&&l.tag===13&&(l.flags|=16384))),Lg(i,e)):yc(i)}function yc(e){var i=e;do{if((i.flags&32768)!==0){Lg(i,Ja);return}e=i.return;var s=iy(i.alternate,i,Sa);if(s!==null){xe=s;return}if(i=i.sibling,i!==null){xe=i;return}xe=i=e}while(i!==null);un===0&&(un=5)}function Lg(e,i){do{var s=ay(e.alternate,e);if(s!==null){s.flags&=32767,xe=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){xe=e;return}xe=e=s}while(e!==null);un=6,xe=null}function Ng(e,i,s,l,f,p,M,D,V){e.cancelPendingCommit=null;do Mc();while(En!==0);if((He&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(p=i.lanes|i.childLanes,p|=ju,We(e,s,p,M,D,V),e===Qe&&(xe=Qe=null,ye=0),yr=i,$a=e,ya=s,oh=p,lh=f,Mg=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,gy(it,function(){return Bg(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=B.T,B.T=null,f=X.p,X.p=2,M=He,He|=4;try{sy(e,i,s)}finally{He=M,X.p=f,B.T=l}}En=1,Og(),Pg(),Ig()}}function Og(){if(En===1){En=0;var e=$a,i=yr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=B.T,B.T=null;var l=X.p;X.p=2;var f=He;He|=4;try{pg(i,e);var p=bh,M=Sm(e.containerInfo),D=p.focusedElem,V=p.selectionRange;if(M!==D&&D&&D.ownerDocument&&xm(D.ownerDocument.documentElement,D)){if(V!==null&&Yu(D)){var ft=V.start,xt=V.end;if(xt===void 0&&(xt=ft),"selectionStart"in D)D.selectionStart=ft,D.selectionEnd=Math.min(xt,D.value.length);else{var Mt=D.ownerDocument||document,ht=Mt&&Mt.defaultView||window;if(ht.getSelection){var mt=ht.getSelection(),Zt=D.textContent.length,ie=Math.min(V.start,Zt),Ke=V.end===void 0?ie:Math.min(V.end,Zt);!mt.extend&&ie>Ke&&(M=Ke,Ke=ie,ie=M);var at=_m(D,ie),Z=_m(D,Ke);if(at&&Z&&(mt.rangeCount!==1||mt.anchorNode!==at.node||mt.anchorOffset!==at.offset||mt.focusNode!==Z.node||mt.focusOffset!==Z.offset)){var ut=Mt.createRange();ut.setStart(at.node,at.offset),mt.removeAllRanges(),ie>Ke?(mt.addRange(ut),mt.extend(Z.node,Z.offset)):(ut.setEnd(Z.node,Z.offset),mt.addRange(ut))}}}}for(Mt=[],mt=D;mt=mt.parentNode;)mt.nodeType===1&&Mt.push({element:mt,left:mt.scrollLeft,top:mt.scrollTop});for(typeof D.focus=="function"&&D.focus(),D=0;D<Mt.length;D++){var yt=Mt[D];yt.element.scrollLeft=yt.left,yt.element.scrollTop=yt.top}}Oc=!!Mh,bh=Mh=null}finally{He=f,X.p=l,B.T=s}}e.current=i,En=2}}function Pg(){if(En===2){En=0;var e=$a,i=yr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=B.T,B.T=null;var l=X.p;X.p=2;var f=He;He|=4;try{cg(e,i.alternate,i)}finally{He=f,X.p=l,B.T=s}}En=3}}function Ig(){if(En===4||En===3){En=0,K();var e=$a,i=yr,s=ya,l=Mg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?En=5:(En=0,yr=$a=null,zg(e,e.pendingLanes));var f=e.pendingLanes;if(f===0&&(ja=null),ro(s),i=i.stateNode,_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(gt,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=B.T,f=X.p,X.p=2,B.T=null;try{for(var p=e.onRecoverableError,M=0;M<l.length;M++){var D=l[M];p(D.value,{componentStack:D.stack})}}finally{B.T=i,X.p=f}}(ya&3)!==0&&Mc(),Ki(e),f=e.pendingLanes,(s&261930)!==0&&(f&42)!==0?e===ch?Ho++:(Ho=0,ch=e):Ho=0,Go(0)}}function zg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,yo(i)))}function Mc(){return Og(),Pg(),Ig(),Bg()}function Bg(){if(En!==5)return!1;var e=$a,i=oh;oh=0;var s=ro(ya),l=B.T,f=X.p;try{X.p=32>s?32:s,B.T=null,s=lh,lh=null;var p=$a,M=ya;if(En=0,yr=$a=null,ya=0,(He&6)!==0)throw Error(a(331));var D=He;if(He|=4,xg(p.current),gg(p,p.current,M,s),He=D,Go(0,!1),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(gt,p)}catch{}return!0}finally{X.p=f,B.T=l,zg(e,i)}}function Fg(e,i,s){i=xi(s,i),i=Gf(e.stateNode,i,2),e=qa(e,i,2),e!==null&&(qt(e,2),Ki(e))}function ke(e,i,s){if(e.tag===3)Fg(e,e,s);else for(;i!==null;){if(i.tag===3){Fg(i,e,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ja===null||!ja.has(l))){e=xi(s,e),s=H0(2),l=qa(i,s,2),l!==null&&(G0(s,l,i,e),qt(l,2),Ki(l));break}}i=i.return}}function hh(e,i,s){var l=e.pingCache;if(l===null){l=e.pingCache=new ly;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(ah=!0,f.add(s),e=dy.bind(null,e,i,s),i.then(e,e))}function dy(e,i,s){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Qe===e&&(ye&s)===s&&(un===4||un===3&&(ye&62914560)===ye&&300>De()-gc?(He&2)===0&&Mr(e,0):sh|=s,Sr===ye&&(Sr=0)),Ki(e)}function Hg(e,i){i===0&&(i=Et()),e=bs(e,i),e!==null&&(qt(e,i),Ki(e))}function py(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),Hg(e,s)}function my(e,i){var s=0;switch(e.tag){case 31:case 13:var l=e.stateNode,f=e.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),Hg(e,s)}function gy(e,i){return ln(e,i)}var bc=null,Er=null,dh=!1,Ec=!1,ph=!1,es=0;function Ki(e){e!==Er&&e.next===null&&(Er===null?bc=Er=e:Er=Er.next=e),Ec=!0,dh||(dh=!0,_y())}function Go(e,i){if(!ph&&Ec){ph=!0;do for(var s=!1,l=bc;l!==null;){if(e!==0){var f=l.pendingLanes;if(f===0)var p=0;else{var M=l.suspendedLanes,D=l.pingedLanes;p=(1<<31-Vt(42|e)+1)-1,p&=f&~(M&~D),p=p&201326741?p&201326741|1:p?p|2:0}p!==0&&(s=!0,Xg(l,p))}else p=ye,p=St(l,l===Qe?p:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(p&3)===0||Lt(l,p)||(s=!0,Xg(l,p));l=l.next}while(s);ph=!1}}function vy(){Gg()}function Gg(){Ec=dh=!1;var e=0;es!==0&&Ry()&&(e=es);for(var i=De(),s=null,l=bc;l!==null;){var f=l.next,p=Vg(l,i);p===0?(l.next=null,s===null?bc=f:s.next=f,f===null&&(Er=s)):(s=l,(e!==0||(p&3)!==0)&&(Ec=!0)),l=f}En!==0&&En!==5||Go(e),es!==0&&(es=0)}function Vg(e,i){for(var s=e.suspendedLanes,l=e.pingedLanes,f=e.expirationTimes,p=e.pendingLanes&-62914561;0<p;){var M=31-Vt(p),D=1<<M,V=f[M];V===-1?((D&s)===0||(D&l)!==0)&&(f[M]=Ft(D,i)):V<=i&&(e.expiredLanes|=D),p&=~D}if(i=Qe,s=ye,s=St(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,s===0||e===i&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Oe(l),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||Lt(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(l!==null&&Oe(l),ro(s)){case 2:case 8:s=E;break;case 32:s=it;break;case 268435456:s=vt;break;default:s=it}return l=kg.bind(null,e),s=ln(s,l),e.callbackPriority=i,e.callbackNode=s,i}return l!==null&&l!==null&&Oe(l),e.callbackPriority=2,e.callbackNode=null,2}function kg(e,i){if(En!==0&&En!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(Mc()&&e.callbackNode!==s)return null;var l=ye;return l=St(e,e===Qe?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(Eg(e,l,i),Vg(e,De()),e.callbackNode!=null&&e.callbackNode===s?kg.bind(null,e):null)}function Xg(e,i){if(Mc())return null;Eg(e,i,!0)}function _y(){Dy(function(){(He&6)!==0?ln(z,vy):Gg()})}function mh(){if(es===0){var e=cr;e===0&&(e=jt,jt<<=1,(jt&261888)===0&&(jt=256)),es=e}return es}function Wg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ui(""+e)}function qg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function xy(e,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var p=Wg((f[Cn]||null).action),M=l.submitter;M&&(i=(i=M[Cn]||null)?Wg(i.formAction):M.getAttribute("formAction"),i!==null&&(p=i,M=null));var D=new Il("action","action",null,l,f);e.push({event:D,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(es!==0){var V=M?qg(f,M):new FormData(f);Pf(s,{pending:!0,data:V,method:f.method,action:p},null,V)}}else typeof p=="function"&&(D.preventDefault(),V=M?qg(f,M):new FormData(f),Pf(s,{pending:!0,data:V,method:f.method,action:p},p,V))},currentTarget:f}]})}}for(var gh=0;gh<Qu.length;gh++){var vh=Qu[gh],Sy=vh.toLowerCase(),yy=vh[0].toUpperCase()+vh.slice(1);Li(Sy,"on"+yy)}Li(bm,"onAnimationEnd"),Li(Em,"onAnimationIteration"),Li(Tm,"onAnimationStart"),Li("dblclick","onDoubleClick"),Li("focusin","onFocus"),Li("focusout","onBlur"),Li(zS,"onTransitionRun"),Li(BS,"onTransitionStart"),Li(FS,"onTransitionCancel"),Li(Am,"onTransitionEnd"),Y("onMouseEnter",["mouseout","mouseover"]),Y("onMouseLeave",["mouseout","mouseover"]),Y("onPointerEnter",["pointerout","pointerover"]),Y("onPointerLeave",["pointerout","pointerover"]),R("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),R("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),R("onBeforeInput",["compositionend","keypress","textInput","paste"]),R("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Vo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),My=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vo));function Yg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var l=e[s],f=l.event;l=l.listeners;t:{var p=void 0;if(i)for(var M=l.length-1;0<=M;M--){var D=l[M],V=D.instance,ft=D.currentTarget;if(D=D.listener,V!==p&&f.isPropagationStopped())break t;p=D,f.currentTarget=ft;try{p(f)}catch(xt){Fl(xt)}f.currentTarget=null,p=V}else for(M=0;M<l.length;M++){if(D=l[M],V=D.instance,ft=D.currentTarget,D=D.listener,V!==p&&f.isPropagationStopped())break t;p=D,f.currentTarget=ft;try{p(f)}catch(xt){Fl(xt)}f.currentTarget=null,p=V}}}}function Se(e,i){var s=i[vs];s===void 0&&(s=i[vs]=new Set);var l=e+"__bubble";s.has(l)||(Zg(i,e,2,!1),s.add(l))}function _h(e,i,s){var l=0;i&&(l|=4),Zg(s,e,l,i)}var Tc="_reactListening"+Math.random().toString(36).slice(2);function xh(e){if(!e[Tc]){e[Tc]=!0,Ll.forEach(function(s){s!=="selectionchange"&&(My.has(s)||_h(s,!1,e),_h(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[Tc]||(i[Tc]=!0,_h("selectionchange",!1,i))}}function Zg(e,i,s,l){switch(bv(i)){case 2:var f=Jy;break;case 8:f=Qy;break;default:f=Oh}s=f.bind(null,i,s,e),f=void 0,!Bu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?e.addEventListener(i,s,{capture:!0,passive:f}):e.addEventListener(i,s,!0):f!==void 0?e.addEventListener(i,s,{passive:f}):e.addEventListener(i,s,!1)}function Sh(e,i,s,l,f){var p=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var M=l.tag;if(M===3||M===4){var D=l.stateNode.containerInfo;if(D===f)break;if(M===4)for(M=l.return;M!==null;){var V=M.tag;if((V===3||V===4)&&M.stateNode.containerInfo===f)return;M=M.return}for(;D!==null;){if(M=sa(D),M===null)return;if(V=M.tag,V===5||V===6||V===26||V===27){l=p=M;continue t}D=D.parentNode}}l=l.return}$p(function(){var ft=p,xt=Iu(s),Mt=[];t:{var ht=wm.get(e);if(ht!==void 0){var mt=Il,Zt=e;switch(e){case"keypress":if(Ol(s)===0)break t;case"keydown":case"keyup":mt=mS;break;case"focusin":Zt="focus",mt=Vu;break;case"focusout":Zt="blur",mt=Vu;break;case"beforeblur":case"afterblur":mt=Vu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":mt=nm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":mt=iS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":mt=_S;break;case bm:case Em:case Tm:mt=rS;break;case Am:mt=SS;break;case"scroll":case"scrollend":mt=eS;break;case"wheel":mt=MS;break;case"copy":case"cut":case"paste":mt=lS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":mt=am;break;case"toggle":case"beforetoggle":mt=ES}var ie=(i&4)!==0,Ke=!ie&&(e==="scroll"||e==="scrollend"),at=ie?ht!==null?ht+"Capture":null:ht;ie=[];for(var Z=ft,ut;Z!==null;){var yt=Z;if(ut=yt.stateNode,yt=yt.tag,yt!==5&&yt!==26&&yt!==27||ut===null||at===null||(yt=co(Z,at),yt!=null&&ie.push(ko(Z,yt,ut))),Ke)break;Z=Z.return}0<ie.length&&(ht=new mt(ht,Zt,null,s,xt),Mt.push({event:ht,listeners:ie}))}}if((i&7)===0){t:{if(ht=e==="mouseover"||e==="pointerover",mt=e==="mouseout"||e==="pointerout",ht&&s!==Pu&&(Zt=s.relatedTarget||s.fromElement)&&(sa(Zt)||Zt[Yn]))break t;if((mt||ht)&&(ht=xt.window===xt?xt:(ht=xt.ownerDocument)?ht.defaultView||ht.parentWindow:window,mt?(Zt=s.relatedTarget||s.toElement,mt=ft,Zt=Zt?sa(Zt):null,Zt!==null&&(Ke=c(Zt),ie=Zt.tag,Zt!==Ke||ie!==5&&ie!==27&&ie!==6)&&(Zt=null)):(mt=null,Zt=ft),mt!==Zt)){if(ie=nm,yt="onMouseLeave",at="onMouseEnter",Z="mouse",(e==="pointerout"||e==="pointerover")&&(ie=am,yt="onPointerLeave",at="onPointerEnter",Z="pointer"),Ke=mt==null?ht:xs(mt),ut=Zt==null?ht:xs(Zt),ht=new ie(yt,Z+"leave",mt,s,xt),ht.target=Ke,ht.relatedTarget=ut,yt=null,sa(xt)===ft&&(ie=new ie(at,Z+"enter",Zt,s,xt),ie.target=ut,ie.relatedTarget=Ke,yt=ie),Ke=yt,mt&&Zt)e:{for(ie=by,at=mt,Z=Zt,ut=0,yt=at;yt;yt=ie(yt))ut++;yt=0;for(var $t=Z;$t;$t=ie($t))yt++;for(;0<ut-yt;)at=ie(at),ut--;for(;0<yt-ut;)Z=ie(Z),yt--;for(;ut--;){if(at===Z||Z!==null&&at===Z.alternate){ie=at;break e}at=ie(at),Z=ie(Z)}ie=null}else ie=null;mt!==null&&Kg(Mt,ht,mt,ie,!1),Zt!==null&&Ke!==null&&Kg(Mt,Ke,Zt,ie,!0)}}t:{if(ht=ft?xs(ft):window,mt=ht.nodeName&&ht.nodeName.toLowerCase(),mt==="select"||mt==="input"&&ht.type==="file")var Pe=hm;else if(um(ht))if(dm)Pe=OS;else{Pe=LS;var Kt=US}else mt=ht.nodeName,!mt||mt.toLowerCase()!=="input"||ht.type!=="checkbox"&&ht.type!=="radio"?ft&&gi(ft.elementType)&&(Pe=hm):Pe=NS;if(Pe&&(Pe=Pe(e,ft))){fm(Mt,Pe,s,xt);break t}Kt&&Kt(e,ht,ft),e==="focusout"&&ft&&ht.type==="number"&&ft.memoizedProps.value!=null&&bn(ht,"number",ht.value)}switch(Kt=ft?xs(ft):window,e){case"focusin":(um(Kt)||Kt.contentEditable==="true")&&(er=Kt,Zu=ft,_o=null);break;case"focusout":_o=Zu=er=null;break;case"mousedown":Ku=!0;break;case"contextmenu":case"mouseup":case"dragend":Ku=!1,ym(Mt,s,xt);break;case"selectionchange":if(IS)break;case"keydown":case"keyup":ym(Mt,s,xt)}var fe;if(Xu)t:{switch(e){case"compositionstart":var Me="onCompositionStart";break t;case"compositionend":Me="onCompositionEnd";break t;case"compositionupdate":Me="onCompositionUpdate";break t}Me=void 0}else tr?lm(e,s)&&(Me="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(Me="onCompositionStart");Me&&(sm&&s.locale!=="ko"&&(tr||Me!=="onCompositionStart"?Me==="onCompositionEnd"&&tr&&(fe=tm()):(Fa=xt,Fu="value"in Fa?Fa.value:Fa.textContent,tr=!0)),Kt=Ac(ft,Me),0<Kt.length&&(Me=new im(Me,e,null,s,xt),Mt.push({event:Me,listeners:Kt}),fe?Me.data=fe:(fe=cm(s),fe!==null&&(Me.data=fe)))),(fe=AS?wS(e,s):RS(e,s))&&(Me=Ac(ft,"onBeforeInput"),0<Me.length&&(Kt=new im("onBeforeInput","beforeinput",null,s,xt),Mt.push({event:Kt,listeners:Me}),Kt.data=fe)),xy(Mt,e,ft,s,xt)}Yg(Mt,i)})}function ko(e,i,s){return{instance:e,listener:i,currentTarget:s}}function Ac(e,i){for(var s=i+"Capture",l=[];e!==null;){var f=e,p=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||p===null||(f=co(e,s),f!=null&&l.unshift(ko(e,f,p)),f=co(e,i),f!=null&&l.push(ko(e,f,p))),e.tag===3)return l;e=e.return}return[]}function by(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Kg(e,i,s,l,f){for(var p=i._reactName,M=[];s!==null&&s!==l;){var D=s,V=D.alternate,ft=D.stateNode;if(D=D.tag,V!==null&&V===l)break;D!==5&&D!==26&&D!==27||ft===null||(V=ft,f?(ft=co(s,p),ft!=null&&M.unshift(ko(s,ft,V))):f||(ft=co(s,p),ft!=null&&M.push(ko(s,ft,V)))),s=s.return}M.length!==0&&e.push({event:i,listeners:M})}var Ey=/\r\n?/g,Ty=/\u0000|\uFFFD/g;function Jg(e){return(typeof e=="string"?e:""+e).replace(Ey,`
`).replace(Ty,"")}function Qg(e,i){return i=Jg(i),Jg(e)===i}function Ze(e,i,s,l,f,p){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Gn(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Gn(e,""+l);break;case"className":Ot(e,"class",l);break;case"tabIndex":Ot(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Ot(e,s,l);break;case"style":sn(e,l,p);break;case"data":if(i!=="object"){Ot(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Ui(""+l),e.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof p=="function"&&(s==="formAction"?(i!=="input"&&Ze(e,i,"name",f.name,f,null),Ze(e,i,"formEncType",f.formEncType,f,null),Ze(e,i,"formMethod",f.formMethod,f,null),Ze(e,i,"formTarget",f.formTarget,f,null)):(Ze(e,i,"encType",f.encType,f,null),Ze(e,i,"method",f.method,f,null),Ze(e,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Ui(""+l),e.setAttribute(s,l);break;case"onClick":l!=null&&(e.onclick=vi);break;case"onScroll":l!=null&&Se("scroll",e);break;case"onScrollEnd":l!=null&&Se("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}s=Ui(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""+l):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":l===!0?e.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,l):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(s,l):e.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(s):e.setAttribute(s,l);break;case"popover":Se("beforetoggle",e),Se("toggle",e),kt(e,"popover",l);break;case"xlinkActuate":Ht(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Ht(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Ht(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Ht(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Ht(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Ht(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":kt(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=qe.get(s)||s,kt(e,s,l))}}function yh(e,i,s,l,f,p){switch(s){case"style":sn(e,l,p);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof l=="string"?Gn(e,l):(typeof l=="number"||typeof l=="bigint")&&Gn(e,""+l);break;case"onScroll":l!=null&&Se("scroll",e);break;case"onScrollEnd":l!=null&&Se("scrollend",e);break;case"onClick":l!=null&&(e.onclick=vi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!lo.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),p=e[Cn]||null,p=p!=null?p[s]:null,typeof p=="function"&&e.removeEventListener(i,p,f),typeof l=="function")){typeof p!="function"&&p!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,l,f);break t}s in e?e[s]=l:l===!0?e.setAttribute(s,""):kt(e,s,l)}}}function Nn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Se("error",e),Se("load",e);var l=!1,f=!1,p;for(p in s)if(s.hasOwnProperty(p)){var M=s[p];if(M!=null)switch(p){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,p,M,s,null)}}f&&Ze(e,i,"srcSet",s.srcSet,s,null),l&&Ze(e,i,"src",s.src,s,null);return;case"input":Se("invalid",e);var D=p=M=f=null,V=null,ft=null;for(l in s)if(s.hasOwnProperty(l)){var xt=s[l];if(xt!=null)switch(l){case"name":f=xt;break;case"type":M=xt;break;case"checked":V=xt;break;case"defaultChecked":ft=xt;break;case"value":p=xt;break;case"defaultValue":D=xt;break;case"children":case"dangerouslySetInnerHTML":if(xt!=null)throw Error(a(137,i));break;default:Ze(e,i,l,xt,s,null)}}Xt(e,p,D,V,ft,M,f,!1);return;case"select":Se("invalid",e),l=M=p=null;for(f in s)if(s.hasOwnProperty(f)&&(D=s[f],D!=null))switch(f){case"value":p=D;break;case"defaultValue":M=D;break;case"multiple":l=D;default:Ze(e,i,f,D,s,null)}i=p,s=M,e.multiple=!!l,i!=null?de(e,!!l,i,!1):s!=null&&de(e,!!l,s,!0);return;case"textarea":Se("invalid",e),p=f=l=null;for(M in s)if(s.hasOwnProperty(M)&&(D=s[M],D!=null))switch(M){case"value":l=D;break;case"defaultValue":f=D;break;case"children":p=D;break;case"dangerouslySetInnerHTML":if(D!=null)throw Error(a(91));break;default:Ze(e,i,M,D,s,null)}ai(e,l,f,p);return;case"option":for(V in s)if(s.hasOwnProperty(V)&&(l=s[V],l!=null))switch(V){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Ze(e,i,V,l,s,null)}return;case"dialog":Se("beforetoggle",e),Se("toggle",e),Se("cancel",e),Se("close",e);break;case"iframe":case"object":Se("load",e);break;case"video":case"audio":for(l=0;l<Vo.length;l++)Se(Vo[l],e);break;case"image":Se("error",e),Se("load",e);break;case"details":Se("toggle",e);break;case"embed":case"source":case"link":Se("error",e),Se("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ft in s)if(s.hasOwnProperty(ft)&&(l=s[ft],l!=null))switch(ft){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,ft,l,s,null)}return;default:if(gi(i)){for(xt in s)s.hasOwnProperty(xt)&&(l=s[xt],l!==void 0&&yh(e,i,xt,l,s,void 0));return}}for(D in s)s.hasOwnProperty(D)&&(l=s[D],l!=null&&Ze(e,i,D,l,s,null))}function Ay(e,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,p=null,M=null,D=null,V=null,ft=null,xt=null;for(mt in s){var Mt=s[mt];if(s.hasOwnProperty(mt)&&Mt!=null)switch(mt){case"checked":break;case"value":break;case"defaultValue":V=Mt;default:l.hasOwnProperty(mt)||Ze(e,i,mt,null,l,Mt)}}for(var ht in l){var mt=l[ht];if(Mt=s[ht],l.hasOwnProperty(ht)&&(mt!=null||Mt!=null))switch(ht){case"type":p=mt;break;case"name":f=mt;break;case"checked":ft=mt;break;case"defaultChecked":xt=mt;break;case"value":M=mt;break;case"defaultValue":D=mt;break;case"children":case"dangerouslySetInnerHTML":if(mt!=null)throw Error(a(137,i));break;default:mt!==Mt&&Ze(e,i,ht,mt,l,Mt)}}gn(e,M,D,V,ft,xt,p,f);return;case"select":mt=M=D=ht=null;for(p in s)if(V=s[p],s.hasOwnProperty(p)&&V!=null)switch(p){case"value":break;case"multiple":mt=V;default:l.hasOwnProperty(p)||Ze(e,i,p,null,l,V)}for(f in l)if(p=l[f],V=s[f],l.hasOwnProperty(f)&&(p!=null||V!=null))switch(f){case"value":ht=p;break;case"defaultValue":D=p;break;case"multiple":M=p;default:p!==V&&Ze(e,i,f,p,l,V)}i=D,s=M,l=mt,ht!=null?de(e,!!s,ht,!1):!!l!=!!s&&(i!=null?de(e,!!s,i,!0):de(e,!!s,s?[]:"",!1));return;case"textarea":mt=ht=null;for(D in s)if(f=s[D],s.hasOwnProperty(D)&&f!=null&&!l.hasOwnProperty(D))switch(D){case"value":break;case"children":break;default:Ze(e,i,D,null,l,f)}for(M in l)if(f=l[M],p=s[M],l.hasOwnProperty(M)&&(f!=null||p!=null))switch(M){case"value":ht=f;break;case"defaultValue":mt=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==p&&Ze(e,i,M,f,l,p)}Hn(e,ht,mt);return;case"option":for(var Zt in s)if(ht=s[Zt],s.hasOwnProperty(Zt)&&ht!=null&&!l.hasOwnProperty(Zt))switch(Zt){case"selected":e.selected=!1;break;default:Ze(e,i,Zt,null,l,ht)}for(V in l)if(ht=l[V],mt=s[V],l.hasOwnProperty(V)&&ht!==mt&&(ht!=null||mt!=null))switch(V){case"selected":e.selected=ht&&typeof ht!="function"&&typeof ht!="symbol";break;default:Ze(e,i,V,ht,l,mt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ie in s)ht=s[ie],s.hasOwnProperty(ie)&&ht!=null&&!l.hasOwnProperty(ie)&&Ze(e,i,ie,null,l,ht);for(ft in l)if(ht=l[ft],mt=s[ft],l.hasOwnProperty(ft)&&ht!==mt&&(ht!=null||mt!=null))switch(ft){case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(a(137,i));break;default:Ze(e,i,ft,ht,l,mt)}return;default:if(gi(i)){for(var Ke in s)ht=s[Ke],s.hasOwnProperty(Ke)&&ht!==void 0&&!l.hasOwnProperty(Ke)&&yh(e,i,Ke,void 0,l,ht);for(xt in l)ht=l[xt],mt=s[xt],!l.hasOwnProperty(xt)||ht===mt||ht===void 0&&mt===void 0||yh(e,i,xt,ht,l,mt);return}}for(var at in s)ht=s[at],s.hasOwnProperty(at)&&ht!=null&&!l.hasOwnProperty(at)&&Ze(e,i,at,null,l,ht);for(Mt in l)ht=l[Mt],mt=s[Mt],!l.hasOwnProperty(Mt)||ht===mt||ht==null&&mt==null||Ze(e,i,Mt,ht,l,mt)}function jg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function wy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],p=f.transferSize,M=f.initiatorType,D=f.duration;if(p&&D&&jg(M)){for(M=0,D=f.responseEnd,l+=1;l<s.length;l++){var V=s[l],ft=V.startTime;if(ft>D)break;var xt=V.transferSize,Mt=V.initiatorType;xt&&jg(Mt)&&(V=V.responseEnd,M+=xt*(V<D?1:(D-ft)/(V-ft)))}if(--l,i+=8*(p+M)/(f.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Mh=null,bh=null;function wc(e){return e.nodeType===9?e:e.ownerDocument}function $g(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function tv(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function Eh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Th=null;function Ry(){var e=window.event;return e&&e.type==="popstate"?e===Th?!1:(Th=e,!0):(Th=null,!1)}var ev=typeof setTimeout=="function"?setTimeout:void 0,Cy=typeof clearTimeout=="function"?clearTimeout:void 0,nv=typeof Promise=="function"?Promise:void 0,Dy=typeof queueMicrotask=="function"?queueMicrotask:typeof nv<"u"?function(e){return nv.resolve(null).then(e).catch(Uy)}:ev;function Uy(e){setTimeout(function(){throw e})}function ns(e){return e==="head"}function iv(e,i){var s=i,l=0;do{var f=s.nextSibling;if(e.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){e.removeChild(f),Rr(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")Xo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Xo(s);for(var p=s.firstChild;p;){var M=p.nextSibling,D=p.nodeName;p[Pa]||D==="SCRIPT"||D==="STYLE"||D==="LINK"&&p.rel.toLowerCase()==="stylesheet"||s.removeChild(p),p=M}}else s==="body"&&Xo(e.ownerDocument.body);s=f}while(s);Rr(i)}function av(e,i){var s=e;e=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=l}while(s)}function Ah(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Ah(s),Ia(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function Ly(e,i,s,l){for(;e.nodeType===1;){var f=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Pa])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(p=e.getAttribute("rel"),p==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(p!==f.rel||e.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||e.getAttribute("title")!==(f.title==null?null:f.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(p=e.getAttribute("src"),(p!==(f.src==null?null:f.src)||e.getAttribute("type")!==(f.type==null?null:f.type)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&p&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var p=f.name==null?null:""+f.name;if(f.type==="hidden"&&e.getAttribute("name")===p)return e}else return e;if(e=Ei(e.nextSibling),e===null)break}return null}function Ny(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Ei(e.nextSibling),e===null))return null;return e}function sv(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Ei(e.nextSibling),e===null))return null;return e}function wh(e){return e.data==="$?"||e.data==="$~"}function Rh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Oy(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Ei(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Ch=null;function rv(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return Ei(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function ov(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function lv(e,i,s){switch(i=wc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Xo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);Ia(e)}var Ti=new Map,cv=new Set;function Rc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ma=X.d;X.d={f:Py,r:Iy,D:zy,C:By,L:Fy,m:Hy,X:Vy,S:Gy,M:ky};function Py(){var e=Ma.f(),i=xc();return e||i}function Iy(e){var i=ra(e);i!==null&&i.tag===5&&i.type==="form"?A0(i):Ma.r(e)}var Tr=typeof document>"u"?null:document;function uv(e,i,s){var l=Tr;if(l&&typeof i=="string"&&i){var f=he(i);f='link[rel="'+e+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),cv.has(f)||(cv.add(f),e={rel:e,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),Nn(i,"link",e),mn(i),l.head.appendChild(i)))}}function zy(e){Ma.D(e),uv("dns-prefetch",e,null)}function By(e,i){Ma.C(e,i),uv("preconnect",e,i)}function Fy(e,i,s){Ma.L(e,i,s);var l=Tr;if(l&&e&&i){var f='link[rel="preload"][as="'+he(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+he(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+he(s.imageSizes)+'"]')):f+='[href="'+he(e)+'"]';var p=f;switch(i){case"style":p=Ar(e);break;case"script":p=wr(e)}Ti.has(p)||(e=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Ti.set(p,e),l.querySelector(f)!==null||i==="style"&&l.querySelector(Wo(p))||i==="script"&&l.querySelector(qo(p))||(i=l.createElement("link"),Nn(i,"link",e),mn(i),l.head.appendChild(i)))}}function Hy(e,i){Ma.m(e,i);var s=Tr;if(s&&e){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+he(l)+'"][href="'+he(e)+'"]',p=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":p=wr(e)}if(!Ti.has(p)&&(e=_({rel:"modulepreload",href:e},i),Ti.set(p,e),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(qo(p)))return}l=s.createElement("link"),Nn(l,"link",e),mn(l),s.head.appendChild(l)}}}function Gy(e,i,s){Ma.S(e,i,s);var l=Tr;if(l&&e){var f=za(l).hoistableStyles,p=Ar(e);i=i||"default";var M=f.get(p);if(!M){var D={loading:0,preload:null};if(M=l.querySelector(Wo(p)))D.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Ti.get(p))&&Dh(e,s);var V=M=l.createElement("link");mn(V),Nn(V,"link",e),V._p=new Promise(function(ft,xt){V.onload=ft,V.onerror=xt}),V.addEventListener("load",function(){D.loading|=1}),V.addEventListener("error",function(){D.loading|=2}),D.loading|=4,Cc(M,i,l)}M={type:"stylesheet",instance:M,count:1,state:D},f.set(p,M)}}}function Vy(e,i){Ma.X(e,i);var s=Tr;if(s&&e){var l=za(s).hoistableScripts,f=wr(e),p=l.get(f);p||(p=s.querySelector(qo(f)),p||(e=_({src:e,async:!0},i),(i=Ti.get(f))&&Uh(e,i),p=s.createElement("script"),mn(p),Nn(p,"link",e),s.head.appendChild(p)),p={type:"script",instance:p,count:1,state:null},l.set(f,p))}}function ky(e,i){Ma.M(e,i);var s=Tr;if(s&&e){var l=za(s).hoistableScripts,f=wr(e),p=l.get(f);p||(p=s.querySelector(qo(f)),p||(e=_({src:e,async:!0,type:"module"},i),(i=Ti.get(f))&&Uh(e,i),p=s.createElement("script"),mn(p),Nn(p,"link",e),s.head.appendChild(p)),p={type:"script",instance:p,count:1,state:null},l.set(f,p))}}function fv(e,i,s,l){var f=(f=wt.current)?Rc(f):null;if(!f)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Ar(s.href),s=za(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Ar(s.href);var p=za(f).hoistableStyles,M=p.get(e);if(M||(f=f.ownerDocument||f,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},p.set(e,M),(p=f.querySelector(Wo(e)))&&!p._p&&(M.instance=p,M.state.loading=5),Ti.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ti.set(e,s),p||Xy(f,e,s,M.state))),i&&l===null)throw Error(a(528,""));return M}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=wr(s),s=za(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Ar(e){return'href="'+he(e)+'"'}function Wo(e){return'link[rel="stylesheet"]['+e+"]"}function hv(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function Xy(e,i,s,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Nn(i,"link",s),mn(i),e.head.appendChild(i))}function wr(e){return'[src="'+he(e)+'"]'}function qo(e){return"script[async]"+e}function dv(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+he(s.href)+'"]');if(l)return i.instance=l,mn(l),l;var f=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),mn(l),Nn(l,"style",f),Cc(l,s.precedence,e),i.instance=l;case"stylesheet":f=Ar(s.href);var p=e.querySelector(Wo(f));if(p)return i.state.loading|=4,i.instance=p,mn(p),p;l=hv(s),(f=Ti.get(f))&&Dh(l,f),p=(e.ownerDocument||e).createElement("link"),mn(p);var M=p;return M._p=new Promise(function(D,V){M.onload=D,M.onerror=V}),Nn(p,"link",l),i.state.loading|=4,Cc(p,s.precedence,e),i.instance=p;case"script":return p=wr(s.src),(f=e.querySelector(qo(p)))?(i.instance=f,mn(f),f):(l=s,(f=Ti.get(p))&&(l=_({},s),Uh(l,f)),e=e.ownerDocument||e,f=e.createElement("script"),mn(f),Nn(f,"link",l),e.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Cc(l,s.precedence,e));return i.instance}function Cc(e,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,p=f,M=0;M<l.length;M++){var D=l[M];if(D.dataset.precedence===i)p=D;else if(p!==f)break}p?p.parentNode.insertBefore(e,p.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function Dh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Uh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Dc=null;function pv(e,i,s){if(Dc===null){var l=new Map,f=Dc=new Map;f.set(s,l)}else f=Dc,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(e))return l;for(l.set(e,null),s=s.getElementsByTagName(e),f=0;f<s.length;f++){var p=s[f];if(!(p[Pa]||p[pn]||e==="link"&&p.getAttribute("rel")==="stylesheet")&&p.namespaceURI!=="http://www.w3.org/2000/svg"){var M=p.getAttribute(i)||"";M=e+M;var D=l.get(M);D?D.push(p):l.set(M,[p])}}return l}function mv(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function Wy(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function gv(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function qy(e,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=Ar(l.href),p=i.querySelector(Wo(f));if(p){i=p._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=Uc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=p,mn(p);return}p=i.ownerDocument||i,l=hv(l),(f=Ti.get(f))&&Dh(l,f),p=p.createElement("link"),mn(p);var M=p;M._p=new Promise(function(D,V){M.onload=D,M.onerror=V}),Nn(p,"link",l),s.instance=p}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=Uc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Lh=0;function Yy(e,i){return e.stylesheets&&e.count===0&&Nc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var l=setTimeout(function(){if(e.stylesheets&&Nc(e,e.stylesheets),e.unsuspend){var p=e.unsuspend;e.unsuspend=null,p()}},6e4+i);0<e.imgBytes&&Lh===0&&(Lh=62500*wy());var f=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Nc(e,e.stylesheets),e.unsuspend)){var p=e.unsuspend;e.unsuspend=null,p()}},(e.imgBytes>Lh?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function Uc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Nc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Lc=null;function Nc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Lc=new Map,i.forEach(Zy,e),Lc=null,Uc.call(e))}function Zy(e,i){if(!(i.state.loading&4)){var s=Lc.get(e);if(s)var l=s.get(null);else{s=new Map,Lc.set(e,s);for(var f=e.querySelectorAll("link[data-precedence],style[data-precedence]"),p=0;p<f.length;p++){var M=f[p];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(s.set(M.dataset.precedence,M),l=M)}l&&s.set(null,l)}f=i.instance,M=f.getAttribute("data-precedence"),p=s.get(M)||l,p===l&&s.set(null,f),s.set(M,f),this.count++,l=Uc.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),p?p.parentNode.insertBefore(f,p.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(f,e.firstChild)),i.state.loading|=4}}var Yo={$$typeof:O,Provider:null,Consumer:null,_currentValue:q,_currentValue2:q,_threadCount:0};function Ky(e,i,s,l,f,p,M,D,V){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Jt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jt(0),this.hiddenUpdates=Jt(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=p,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=V,this.incompleteTransitions=new Map}function vv(e,i,s,l,f,p,M,D,V,ft,xt,Mt){return e=new Ky(e,i,s,M,V,ft,xt,Mt,D),i=1,p===!0&&(i|=24),p=ri(3,null,null,i),e.current=p,p.stateNode=e,i=ff(),i.refCount++,e.pooledCache=i,i.refCount++,p.memoizedState={element:l,isDehydrated:s,cache:i},mf(p),e}function _v(e){return e?(e=ar,e):ar}function xv(e,i,s,l,f,p){f=_v(f),l.context===null?l.context=f:l.pendingContext=f,l=Wa(i),l.payload={element:s},p=p===void 0?null:p,p!==null&&(l.callback=p),s=qa(e,l,i),s!==null&&($n(s,e,i),To(s,e,i))}function Sv(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function Nh(e,i){Sv(e,i),(e=e.alternate)&&Sv(e,i)}function yv(e){if(e.tag===13||e.tag===31){var i=bs(e,67108864);i!==null&&$n(i,e,67108864),Nh(e,67108864)}}function Mv(e){if(e.tag===13||e.tag===31){var i=fi();i=so(i);var s=bs(e,i);s!==null&&$n(s,e,i),Nh(e,i)}}var Oc=!0;function Jy(e,i,s,l){var f=B.T;B.T=null;var p=X.p;try{X.p=2,Oh(e,i,s,l)}finally{X.p=p,B.T=f}}function Qy(e,i,s,l){var f=B.T;B.T=null;var p=X.p;try{X.p=8,Oh(e,i,s,l)}finally{X.p=p,B.T=f}}function Oh(e,i,s,l){if(Oc){var f=Ph(l);if(f===null)Sh(e,i,l,Pc,s),Ev(e,l);else if($y(f,e,i,s,l))l.stopPropagation();else if(Ev(e,l),i&4&&-1<jy.indexOf(e)){for(;f!==null;){var p=ra(f);if(p!==null)switch(p.tag){case 3:if(p=p.stateNode,p.current.memoizedState.isDehydrated){var M=Dt(p.pendingLanes);if(M!==0){var D=p;for(D.pendingLanes|=2,D.entangledLanes|=2;M;){var V=1<<31-Vt(M);D.entanglements[1]|=V,M&=~V}Ki(p),(He&6)===0&&(vc=De()+500,Go(0))}}break;case 31:case 13:D=bs(p,2),D!==null&&$n(D,p,2),xc(),Nh(p,2)}if(p=Ph(l),p===null&&Sh(e,i,l,Pc,s),p===f)break;f=p}f!==null&&l.stopPropagation()}else Sh(e,i,l,null,s)}}function Ph(e){return e=Iu(e),Ih(e)}var Pc=null;function Ih(e){if(Pc=null,e=sa(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=u(i),e!==null)return e;e=null}else if(s===31){if(e=h(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Pc=e,null}function bv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(_e()){case z:return 2;case E:return 8;case it:case ot:return 32;case vt:return 268435456;default:return 32}default:return 32}}var zh=!1,is=null,as=null,ss=null,Zo=new Map,Ko=new Map,rs=[],jy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Ev(e,i){switch(e){case"focusin":case"focusout":is=null;break;case"dragenter":case"dragleave":as=null;break;case"mouseover":case"mouseout":ss=null;break;case"pointerover":case"pointerout":Zo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ko.delete(i.pointerId)}}function Jo(e,i,s,l,f,p){return e===null||e.nativeEvent!==p?(e={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:p,targetContainers:[f]},i!==null&&(i=ra(i),i!==null&&yv(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),e)}function $y(e,i,s,l,f){switch(i){case"focusin":return is=Jo(is,e,i,s,l,f),!0;case"dragenter":return as=Jo(as,e,i,s,l,f),!0;case"mouseover":return ss=Jo(ss,e,i,s,l,f),!0;case"pointerover":var p=f.pointerId;return Zo.set(p,Jo(Zo.get(p)||null,e,i,s,l,f)),!0;case"gotpointercapture":return p=f.pointerId,Ko.set(p,Jo(Ko.get(p)||null,e,i,s,l,f)),!0}return!1}function Tv(e){var i=sa(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){e.blockedOn=i,Qs(e.priority,function(){Mv(s)});return}}else if(i===31){if(i=h(s),i!==null){e.blockedOn=i,Qs(e.priority,function(){Mv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ic(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Ph(e.nativeEvent);if(s===null){s=e.nativeEvent;var l=new s.constructor(s.type,s);Pu=l,s.target.dispatchEvent(l),Pu=null}else return i=ra(s),i!==null&&yv(i),e.blockedOn=s,!1;i.shift()}return!0}function Av(e,i,s){Ic(e)&&s.delete(i)}function tM(){zh=!1,is!==null&&Ic(is)&&(is=null),as!==null&&Ic(as)&&(as=null),ss!==null&&Ic(ss)&&(ss=null),Zo.forEach(Av),Ko.forEach(Av)}function zc(e,i){e.blockedOn===i&&(e.blockedOn=null,zh||(zh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,tM)))}var Bc=null;function wv(e){Bc!==e&&(Bc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Bc===e&&(Bc=null);for(var i=0;i<e.length;i+=3){var s=e[i],l=e[i+1],f=e[i+2];if(typeof l!="function"){if(Ih(l||s)===null)continue;break}var p=ra(s);p!==null&&(e.splice(i,3),i-=3,Pf(p,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function Rr(e){function i(V){return zc(V,e)}is!==null&&zc(is,e),as!==null&&zc(as,e),ss!==null&&zc(ss,e),Zo.forEach(i),Ko.forEach(i);for(var s=0;s<rs.length;s++){var l=rs[s];l.blockedOn===e&&(l.blockedOn=null)}for(;0<rs.length&&(s=rs[0],s.blockedOn===null);)Tv(s),s.blockedOn===null&&rs.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],p=s[l+1],M=f[Cn]||null;if(typeof p=="function")M||wv(s);else if(M){var D=null;if(p&&p.hasAttribute("formAction")){if(f=p,M=p[Cn]||null)D=M.formAction;else if(Ih(f)!==null)continue}else D=M.action;typeof D=="function"?s[l+1]=D:(s.splice(l,3),l-=3),wv(s)}}}function Rv(){function e(p){p.canIntercept&&p.info==="react-transition"&&p.intercept({handler:function(){return new Promise(function(M){return f=M})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var p=navigation.currentEntry;p&&p.url!=null&&navigation.navigate(p.url,{state:p.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function Bh(e){this._internalRoot=e}Fc.prototype.render=Bh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=fi();xv(s,l,e,i,null,null)},Fc.prototype.unmount=Bh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;xv(e.current,2,null,e,null,null),xc(),i[Yn]=null}};function Fc(e){this._internalRoot=e}Fc.prototype.unstable_scheduleHydration=function(e){if(e){var i=oo();e={blockedOn:null,target:e,priority:i};for(var s=0;s<rs.length&&i!==0&&i<rs[s].priority;s++);rs.splice(s,0,e),s===0&&Tv(e)}};var Cv=t.version;if(Cv!=="19.2.7")throw Error(a(527,Cv,"19.2.7"));X.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=d(i),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var eM={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Hc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Hc.isDisabled&&Hc.supportsFiber)try{gt=Hc.inject(eM),_t=Hc}catch{}}return jo.createRoot=function(e,i){if(!o(e))throw Error(a(299));var s=!1,l="",f=I0,p=z0,M=B0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(p=i.onCaughtError),i.onRecoverableError!==void 0&&(M=i.onRecoverableError)),i=vv(e,1,!1,null,null,s,l,null,f,p,M,Rv),e[Yn]=i.current,xh(e),new Bh(i)},jo.hydrateRoot=function(e,i,s){if(!o(e))throw Error(a(299));var l=!1,f="",p=I0,M=z0,D=B0,V=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(p=s.onUncaughtError),s.onCaughtError!==void 0&&(M=s.onCaughtError),s.onRecoverableError!==void 0&&(D=s.onRecoverableError),s.formState!==void 0&&(V=s.formState)),i=vv(e,1,!0,i,s??null,l,f,V,p,M,D,Rv),i.context=_v(null),s=i.current,l=fi(),l=so(l),f=Wa(l),f.callback=null,qa(s,f,l),s=l,i.current.lanes=s,qt(i,s),Ki(i),e[Yn]=i.current,xh(e),new Fc(i)},jo.version="19.2.7",jo}var Fv;function fM(){if(Fv)return Gh.exports;Fv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Gh.exports=uM(),Gh.exports}var hM=fM();function dM(r,t,n,a){ze.useEffect(()=>{const o=t.current,c=n.current;if(!a||!o||!c)return;const u=o.closest("[data-scene-surface]")??o;let h=null;const m=_=>{if(!h||_.pointerId!==h.id)return;const g=Math.max(1,Math.min(u.clientWidth,u.clientHeight));r.drag(c,(_.clientX-h.x)/g,(_.clientY-h.y)/g)},d=_=>{!h||_&&_.pointerId!==h.id||(h=null,delete o.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d))},v=_=>{if(h||!_.isPrimary||_.button!==0)return;const g=_.target instanceof Element?_.target:null;!g||!(o.contains(g)||g.hasAttribute("data-scene-drag"))||(_.pointerType==="mouse"&&_.preventDefault(),h={id:_.pointerId,x:_.clientX,y:_.clientY},o.dataset.look="drag",window.addEventListener("pointermove",m),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))};return u.addEventListener("pointerdown",v),()=>{u.removeEventListener("pointerdown",v),d()}},[a,r,t,n])}function pM(r){const[t,n]=ze.useState(!1);return ze.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>n(r&&!document.hidden&&!a.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(o);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),a.addEventListener("change",o),document.addEventListener("visibilitychange",o),o(),()=>{c.disconnect(),a.removeEventListener("change",o),document.removeEventListener("visibilitychange",o)}},[r]),t}class mM{constructor(t){this.options=t,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null}acquire(t){return window.clearTimeout(this.disposeTimer),this.holders.push(t),this.ensureEngine(),this.attachTop(),t.onStatus(this.status),()=>this.release(t)}setRunning(t,n){t.running=n,this.top===t&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(t){}drag(t,n,a){var o,c;this.top===t&&((c=(o=this.engine)==null?void 0:o.drag)==null||c.call(o,n,a))}releaseDrag(t){var n,a;this.top===t&&((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n))}release(t){var n,a;if(this.holders=this.holders.filter(o=>o!==t),this.holders.length){this.attachTop();return}(n=this.engine)==null||n.stop(),this.observe(null),(a=this.canvas)==null||a.remove(),this.disposeTimer=window.setTimeout(()=>this.teardown(),5e3)}setStatus(t){this.status=t;for(const n of this.holders)n.onStatus(t)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const t=document.createElement("canvas");t.className=this.options.canvasClass,t.setAttribute("aria-hidden","true"),this.canvas=t;try{this.engine=this.options.create(t,()=>this.fail())}catch{this.fail();return}const n=this.engine;this.setStatus("loading"),this.configure(n),this.resize(),n.init().then(()=>{this.engine===n&&(n.renderFrame(0),this.setStatus("ready"),this.applyRunning())}).catch(()=>this.fail())}attachTop(){var n,a;const t=this.top;!t||!this.canvas||((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n),this.canvas.parentElement!==t.mount&&t.mount.appendChild(this.canvas),this.observe(t.mount),this.resize(),this.applyRunning())}observe(t){var n;this.observed!==t&&((n=this.observer)==null||n.disconnect(),this.observed=t,t&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(t)))}resize(){var o,c;const t=(o=this.top)==null?void 0:o.mount;if(!t||!this.engine)return;const n=t.clientWidth||window.innerWidth,a=t.clientHeight||window.innerHeight;this.engine.setSize(n,a,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var t;!this.engine||this.status!=="ready"||((t=this.top)!=null&&t.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}teardown(){var t,n;window.clearTimeout(this.disposeTimer),this.observe(null),(t=this.engine)==null||t.dispose(),this.engine=null,(n=this.canvas)==null||n.remove(),this.canvas=null,this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xp="186",gM=0,Hv=1,vM=2,pu=1,ox=2,cl=3,Xs=0,Wn=1,ei=2,La=0,dl=1,yu=2,Gv=3,Vv=4,_M=5,Wr=100,xM=101,SM=102,yM=103,MM=104,bM=200,EM=201,TM=202,AM=203,lx=204,cx=205,wM=206,RM=207,CM=208,DM=209,UM=210,LM=211,NM=212,OM=213,PM=214,Td=0,Ad=1,wd=2,Sl=3,Rd=4,Cd=5,Dd=6,Ud=7,ux=0,IM=1,zM=2,ea=0,fx=1,hx=2,dx=3,Sp=4,px=5,mx=6,gx=7,vx=300,Ws=301,$r=302,Wh=303,qh=304,Uu=306,Mu=1e3,Da=1001,Ld=1002,On=1003,BM=1004,Gc=1005,Fn=1006,Yh=1007,Gs=1008,mi=1009,_x=1010,xx=1011,yl=1012,yp=1013,na=1014,Fi=1015,ki=1016,Mp=1017,bp=1018,Ml=1020,Sx=35902,yx=35899,Mx=1021,bx=1022,Hi=1023,Oa=1026,Vs=1027,Ep=1028,Tp=1029,qs=1030,Ap=1031,wp=1033,mu=33776,gu=33777,vu=33778,_u=33779,Nd=35840,Od=35841,Pd=35842,Id=35843,zd=36196,Bd=37492,Fd=37496,Hd=37488,Gd=37489,bu=37490,Vd=37491,kd=37808,Xd=37809,Wd=37810,qd=37811,Yd=37812,Zd=37813,Kd=37814,Jd=37815,Qd=37816,jd=37817,$d=37818,tp=37819,ep=37820,np=37821,ip=36492,ap=36494,sp=36495,rp=36283,op=36284,Eu=36285,lp=36286,FM=3200,cp=0,HM=1,Ca="",ti="srgb",Tu="srgb-linear",Au="linear",Xe="srgb",Zh=7680,GM=519,VM=512,kM=513,XM=514,Rp=515,WM=516,qM=517,Cp=518,YM=519,ZM=35044,kv="300 es",ta=2e3,bl=2001;function KM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function wu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function JM(){const r=wu("canvas");return r.style.display="block",r}const Xv={};function Wv(...r){const t="THREE."+r.shift();console.log(t,...r)}function Ex(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ae(...r){r=Ex(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...r)}}function Ne(...r){r=Ex(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...r)}}function Jr(...r){const t=r.join(" ");t in Xv||(Xv[t]=!0,ae(...r))}function QM(r,t,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const jM={[Td]:Ad,[wd]:Dd,[Rd]:Ud,[Sl]:Cd,[Ad]:Td,[Dd]:wd,[Ud]:Rd,[Cd]:Sl};class Zs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const o=a[t];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,t);t.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qv=1234567;const pl=Math.PI/180,El=180/Math.PI;function Ks(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]+"-"+zn[t&255]+zn[t>>8&255]+"-"+zn[t>>16&15|64]+zn[t>>24&255]+"-"+zn[n&63|128]+zn[n>>8&255]+"-"+zn[n>>16&255]+zn[n>>24&255]+zn[a&255]+zn[a>>8&255]+zn[a>>16&255]+zn[a>>24&255]).toLowerCase()}function ve(r,t,n){return Math.max(t,Math.min(n,r))}function Dp(r,t){return(r%t+t)%t}function $M(r,t,n,a,o){return a+(r-t)*(o-a)/(n-t)}function tb(r,t,n){return r!==t?(n-r)/(t-r):0}function ml(r,t,n){return(1-n)*r+n*t}function eb(r,t,n,a){return ml(r,t,1-Math.exp(-n*a))}function nb(r,t=1){return t-Math.abs(Dp(r,t*2)-t)}function ib(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function ab(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function sb(r,t){return r+Math.floor(Math.random()*(t-r+1))}function rb(r,t){return r+Math.random()*(t-r)}function ob(r){return r*(.5-Math.random())}function lb(r){r!==void 0&&(qv=r);let t=qv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cb(r){return r*pl}function ub(r){return r*El}function fb(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function hb(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function db(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function pb(r,t,n,a,o){const c=Math.cos,u=Math.sin,h=c(n/2),m=u(n/2),d=c((t+a)/2),v=u((t+a)/2),_=c((t-a)/2),g=u((t-a)/2),x=c((a-t)/2),b=u((a-t)/2);switch(o){case"XYX":r.set(h*v,m*_,m*g,h*d);break;case"YZY":r.set(m*g,h*v,m*_,h*d);break;case"ZXZ":r.set(m*_,m*g,h*v,h*d);break;case"XZX":r.set(h*v,m*b,m*x,h*d);break;case"YXY":r.set(m*x,h*v,m*b,h*d);break;case"ZYZ":r.set(m*b,m*x,h*v,h*d);break;default:ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function qr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function kn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Up={DEG2RAD:pl,RAD2DEG:El,generateUUID:Ks,clamp:ve,euclideanModulo:Dp,mapLinear:$M,inverseLerp:tb,lerp:ml,damp:eb,pingpong:nb,smoothstep:ib,smootherstep:ab,randInt:sb,randFloat:rb,randFloatSpread:ob,seededRandom:lb,degToRad:cb,radToDeg:ub,isPowerOfTwo:fb,ceilPowerOfTwo:hb,floorPowerOfTwo:db,setQuaternionFromProperEuler:pb,normalize:kn,denormalize:qr},Yp=class Yp{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=ve(this.x,t.x,n.x),this.y=ve(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=ve(this.x,t,n),this.y=ve(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ve(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ve(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-t.x,u=this.y-t.y;return this.x=c*a-u*o+t.x,this.y=c*o+u*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Yp.prototype.isVector2=!0;let Wt=Yp;class ia{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,c,u,h){let m=a[o+0],d=a[o+1],v=a[o+2],_=a[o+3],g=c[u+0],x=c[u+1],b=c[u+2],w=c[u+3];if(_!==w||m!==g||d!==x||v!==b){let y=m*g+d*x+v*b+_*w;y<0&&(g=-g,x=-x,b=-b,w=-w,y=-y);let S=1-h;if(y<.9995){const C=Math.acos(y),O=Math.sin(C);S=Math.sin(S*C)/O,h=Math.sin(h*C)/O,m=m*S+g*h,d=d*S+x*h,v=v*S+b*h,_=_*S+w*h}else{m=m*S+g*h,d=d*S+x*h,v=v*S+b*h,_=_*S+w*h;const C=1/Math.sqrt(m*m+d*d+v*v+_*_);m*=C,d*=C,v*=C,_*=C}}t[n]=m,t[n+1]=d,t[n+2]=v,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,o,c,u){const h=a[o],m=a[o+1],d=a[o+2],v=a[o+3],_=c[u],g=c[u+1],x=c[u+2],b=c[u+3];return t[n]=h*b+v*_+m*x-d*g,t[n+1]=m*b+v*g+d*_-h*x,t[n+2]=d*b+v*x+h*g-m*_,t[n+3]=v*b-h*_-m*g-d*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,c=t._z,u=t._order,h=Math.cos,m=Math.sin,d=h(a/2),v=h(o/2),_=h(c/2),g=m(a/2),x=m(o/2),b=m(c/2);switch(u){case"XYZ":this._x=g*v*_+d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_-g*x*b;break;case"YXZ":this._x=g*v*_+d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_+g*x*b;break;case"ZXY":this._x=g*v*_-d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_-g*x*b;break;case"ZYX":this._x=g*v*_-d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_+g*x*b;break;case"YZX":this._x=g*v*_+d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_-g*x*b;break;case"XZY":this._x=g*v*_-d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_+g*x*b;break;default:ae("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],c=n[8],u=n[1],h=n[5],m=n[9],d=n[2],v=n[6],_=n[10],g=a+h+_;if(g>0){const x=.5/Math.sqrt(g+1);this._w=.25/x,this._x=(v-m)*x,this._y=(c-d)*x,this._z=(u-o)*x}else if(a>h&&a>_){const x=2*Math.sqrt(1+a-h-_);this._w=(v-m)/x,this._x=.25*x,this._y=(o+u)/x,this._z=(c+d)/x}else if(h>_){const x=2*Math.sqrt(1+h-a-_);this._w=(c-d)/x,this._x=(o+u)/x,this._y=.25*x,this._z=(m+v)/x}else{const x=2*Math.sqrt(1+_-a-h);this._w=(u-o)/x,this._x=(c+d)/x,this._y=(m+v)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,c=t._z,u=t._w,h=n._x,m=n._y,d=n._z,v=n._w;return this._x=a*v+u*h+o*d-c*m,this._y=o*v+u*m+c*h-a*d,this._z=c*v+u*d+a*m-o*h,this._w=u*v-a*h-o*m-c*d,this._onChangeCallback(),this}slerp(t,n){let a=t._x,o=t._y,c=t._z,u=t._w,h=this.dot(t);h<0&&(a=-a,o=-o,c=-c,u=-u,h=-h);let m=1-n;if(h<.9995){const d=Math.acos(h),v=Math.sin(d);m=Math.sin(m*d)/v,n=Math.sin(n*d)/v,this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this._onChangeCallback()}else this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Zp=class Zp{constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Yv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Yv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=t.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,c=t.x,u=t.y,h=t.z,m=t.w,d=2*(u*o-h*a),v=2*(h*n-c*o),_=2*(c*a-u*n);return this.x=n+m*d+u*_-h*v,this.y=a+m*v+h*d-c*_,this.z=o+m*_+c*v-u*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=ve(this.x,t.x,n.x),this.y=ve(this.y,t.y,n.y),this.z=ve(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=ve(this.x,t,n),this.y=ve(this.y,t,n),this.z=ve(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ve(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,c=t.z,u=n.x,h=n.y,m=n.z;return this.x=o*m-c*h,this.y=c*u-a*m,this.z=a*h-o*u,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Kh.copy(this).projectOnVector(t),this.sub(Kh)}reflect(t){return this.sub(Kh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ve(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Zp.prototype.isVector3=!0;let G=Zp;const Kh=new G,Yv=new ia,Kp=class Kp{constructor(t,n,a,o,c,u,h,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,h,m,d)}set(t,n,a,o,c,u,h,m,d){const v=this.elements;return v[0]=t,v[1]=o,v[2]=h,v[3]=n,v[4]=c,v[5]=m,v[6]=a,v[7]=u,v[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],h=a[3],m=a[6],d=a[1],v=a[4],_=a[7],g=a[2],x=a[5],b=a[8],w=o[0],y=o[3],S=o[6],C=o[1],O=o[4],A=o[7],U=o[2],L=o[5],I=o[8];return c[0]=u*w+h*C+m*U,c[3]=u*y+h*O+m*L,c[6]=u*S+h*A+m*I,c[1]=d*w+v*C+_*U,c[4]=d*y+v*O+_*L,c[7]=d*S+v*A+_*I,c[2]=g*w+x*C+b*U,c[5]=g*y+x*O+b*L,c[8]=g*S+x*A+b*I,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],d=t[7],v=t[8];return n*u*v-n*h*d-a*c*v+a*h*m+o*c*d-o*u*m}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],d=t[7],v=t[8],_=v*u-h*d,g=h*m-v*c,x=d*c-u*m,b=n*_+a*g+o*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=_*w,t[1]=(o*d-v*a)*w,t[2]=(h*a-o*u)*w,t[3]=g*w,t[4]=(v*n-o*m)*w,t[5]=(o*c-h*n)*w,t[6]=x*w,t[7]=(a*m-d*n)*w,t[8]=(u*n-a*c)*w,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,c,u,h){const m=Math.cos(c),d=Math.sin(c);return this.set(a*m,a*d,-a*(m*u+d*h)+u+t,-o*d,o*m,-o*(-d*u+m*h)+h+n,0,0,1),this}scale(t,n){return Jr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Jh.makeScale(t,n)),this}rotate(t){return Jr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Jh.makeRotation(-t)),this}translate(t,n){return Jr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Jh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Kp.prototype.isMatrix3=!0;let oe=Kp;const Jh=new oe,Zv=new oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kv=new oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mb(){const r={enabled:!0,workingColorSpace:Tu,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===Xe&&(o.r=Na(o.r),o.g=Na(o.g),o.b=Na(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Xe&&(o.r=Qr(o.r),o.g=Qr(o.g),o.b=Qr(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Ca?Au:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return Jr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return Jr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[Tu]:{primaries:t,whitePoint:a,transfer:Au,toXYZ:Zv,fromXYZ:Kv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:t,whitePoint:a,transfer:Xe,toXYZ:Zv,fromXYZ:Kv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}}),r}const Ae=mb();function Na(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Qr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Cr;class gb{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Cr===void 0&&(Cr=wu("canvas")),Cr.width=t.width,Cr.height=t.height;const o=Cr.getContext("2d");t instanceof ImageData?o.putImageData(t,0,0):o.drawImage(t,0,0,t.width,t.height),a=Cr}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=wu("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=Na(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Na(n[a]/255)*255):n[a]=Na(n[a]);return{data:n,width:t.width,height:t.height}}else return ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vb=0;class Lp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:vb++}),this.uuid=Ks(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,h=o.length;u<h;u++)o[u].isDataTexture?c.push(Qh(o[u].image)):c.push(Qh(o[u]))}else c=Qh(o);a.url=c}return n||(t.images[this.uuid]=a),a}}function Qh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?gb.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ae("Texture: Unable to serialize Texture."),{})}let _b=0;const jh=new G;class Pn extends Zs{constructor(t=Pn.DEFAULT_IMAGE,n=Pn.DEFAULT_MAPPING,a=Da,o=Da,c=Fn,u=Gs,h=Hi,m=mi,d=Pn.DEFAULT_ANISOTROPY,v=Ca){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_b++}),this.uuid=Ks(),this.name="",this.source=new Lp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=d,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(jh).x}get height(){return this.source.getSize(jh).y}get depth(){return this.source.getSize(jh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){ae(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){ae(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vx)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Mu:t.x=t.x-Math.floor(t.x);break;case Da:t.x=t.x<0?0:1;break;case Ld:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Mu:t.y=t.y-Math.floor(t.y);break;case Da:t.y=t.y<0?0:1;break;case Ld:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pn.DEFAULT_IMAGE=null;Pn.DEFAULT_MAPPING=vx;Pn.DEFAULT_ANISOTROPY=1;const Jp=class Jp{constructor(t=0,n=0,a=0,o=1){this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=this.w,u=t.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,c;const m=t.elements,d=m[0],v=m[4],_=m[8],g=m[1],x=m[5],b=m[9],w=m[2],y=m[6],S=m[10];if(Math.abs(v-g)<.01&&Math.abs(_-w)<.01&&Math.abs(b-y)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+w)<.1&&Math.abs(b+y)<.1&&Math.abs(d+x+S-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const O=(d+1)/2,A=(x+1)/2,U=(S+1)/2,L=(v+g)/4,I=(_+w)/4,T=(b+y)/4;return O>A&&O>U?O<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(O),o=L/a,c=I/a):A>U?A<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(A),a=L/o,c=T/o):U<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(U),a=I/c,o=T/c),this.set(a,o,c,n),this}let C=Math.sqrt((y-b)*(y-b)+(_-w)*(_-w)+(g-v)*(g-v));return Math.abs(C)<.001&&(C=1),this.x=(y-b)/C,this.y=(_-w)/C,this.z=(g-v)/C,this.w=Math.acos((d+x+S-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=ve(this.x,t.x,n.x),this.y=ve(this.y,t.y,n.y),this.z=ve(this.z,t.z,n.z),this.w=ve(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=ve(this.x,t,n),this.y=ve(this.y,t,n),this.z=ve(this.z,t,n),this.w=ve(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ve(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Jp.prototype.isVector4=!0;let an=Jp;class xb extends Zs{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new an(0,0,t,n),this.scissorTest=!1,this.viewport=new an(0,0,t,n),this.textures=[];const o={width:t,height:n,depth:a.depth},c=new Pn(o),u=a.count;for(let h=0;h<u;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},t.textures[n].image);this.textures[n].source=new Lp(o)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Di extends xb{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class Tx extends Pn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=On,this.minFilter=On,this.wrapR=Da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Sb extends Pn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=On,this.minFilter=On,this.wrapR=Da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Du=class Du{constructor(t,n,a,o,c,u,h,m,d,v,_,g,x,b,w,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,h,m,d,v,_,g,x,b,w,y)}set(t,n,a,o,c,u,h,m,d,v,_,g,x,b,w,y){const S=this.elements;return S[0]=t,S[4]=n,S[8]=a,S[12]=o,S[1]=c,S[5]=u,S[9]=h,S[13]=m,S[2]=d,S[6]=v,S[10]=_,S[14]=g,S[3]=x,S[7]=b,S[11]=w,S[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Du().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,o=1/Dr.setFromMatrixColumn(t,0).length(),c=1/Dr.setFromMatrixColumn(t,1).length(),u=1/Dr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,c=t.z,u=Math.cos(a),h=Math.sin(a),m=Math.cos(o),d=Math.sin(o),v=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const g=u*v,x=u*_,b=h*v,w=h*_;n[0]=m*v,n[4]=-m*_,n[8]=d,n[1]=x+b*d,n[5]=g-w*d,n[9]=-h*m,n[2]=w-g*d,n[6]=b+x*d,n[10]=u*m}else if(t.order==="YXZ"){const g=m*v,x=m*_,b=d*v,w=d*_;n[0]=g+w*h,n[4]=b*h-x,n[8]=u*d,n[1]=u*_,n[5]=u*v,n[9]=-h,n[2]=x*h-b,n[6]=w+g*h,n[10]=u*m}else if(t.order==="ZXY"){const g=m*v,x=m*_,b=d*v,w=d*_;n[0]=g-w*h,n[4]=-u*_,n[8]=b+x*h,n[1]=x+b*h,n[5]=u*v,n[9]=w-g*h,n[2]=-u*d,n[6]=h,n[10]=u*m}else if(t.order==="ZYX"){const g=u*v,x=u*_,b=h*v,w=h*_;n[0]=m*v,n[4]=b*d-x,n[8]=g*d+w,n[1]=m*_,n[5]=w*d+g,n[9]=x*d-b,n[2]=-d,n[6]=h*m,n[10]=u*m}else if(t.order==="YZX"){const g=u*m,x=u*d,b=h*m,w=h*d;n[0]=m*v,n[4]=w-g*_,n[8]=b*_+x,n[1]=_,n[5]=u*v,n[9]=-h*v,n[2]=-d*v,n[6]=x*_+b,n[10]=g-w*_}else if(t.order==="XZY"){const g=u*m,x=u*d,b=h*m,w=h*d;n[0]=m*v,n[4]=-_,n[8]=d*v,n[1]=g*_+w,n[5]=u*v,n[9]=x*_-b,n[2]=b*_-x,n[6]=h*v,n[10]=w*_+g}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(yb,t,Mb)}lookAt(t,n,a){const o=this.elements;return hi.subVectors(t,n),hi.lengthSq()===0&&(hi.z=1),hi.normalize(),ls.crossVectors(a,hi),ls.lengthSq()===0&&(Math.abs(a.z)===1?hi.x+=1e-4:hi.z+=1e-4,hi.normalize(),ls.crossVectors(a,hi)),ls.normalize(),Vc.crossVectors(hi,ls),o[0]=ls.x,o[4]=Vc.x,o[8]=hi.x,o[1]=ls.y,o[5]=Vc.y,o[9]=hi.y,o[2]=ls.z,o[6]=Vc.z,o[10]=hi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],h=a[4],m=a[8],d=a[12],v=a[1],_=a[5],g=a[9],x=a[13],b=a[2],w=a[6],y=a[10],S=a[14],C=a[3],O=a[7],A=a[11],U=a[15],L=o[0],I=o[4],T=o[8],P=o[12],F=o[1],W=o[5],H=o[9],$=o[13],k=o[2],tt=o[6],B=o[10],X=o[14],q=o[3],nt=o[7],rt=o[11],N=o[15];return c[0]=u*L+h*F+m*k+d*q,c[4]=u*I+h*W+m*tt+d*nt,c[8]=u*T+h*H+m*B+d*rt,c[12]=u*P+h*$+m*X+d*N,c[1]=v*L+_*F+g*k+x*q,c[5]=v*I+_*W+g*tt+x*nt,c[9]=v*T+_*H+g*B+x*rt,c[13]=v*P+_*$+g*X+x*N,c[2]=b*L+w*F+y*k+S*q,c[6]=b*I+w*W+y*tt+S*nt,c[10]=b*T+w*H+y*B+S*rt,c[14]=b*P+w*$+y*X+S*N,c[3]=C*L+O*F+A*k+U*q,c[7]=C*I+O*W+A*tt+U*nt,c[11]=C*T+O*H+A*B+U*rt,c[15]=C*P+O*$+A*X+U*N,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[12],u=t[1],h=t[5],m=t[9],d=t[13],v=t[2],_=t[6],g=t[10],x=t[14],b=t[3],w=t[7],y=t[11],S=t[15],C=m*x-d*g,O=h*x-d*_,A=h*g-m*_,U=u*x-d*v,L=u*g-m*v,I=u*_-h*v;return n*(w*C-y*O+S*A)-a*(b*C-y*U+S*L)+o*(b*O-w*U+S*I)-c*(b*A-w*L+y*I)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[1],u=t[5],h=t[9],m=t[2],d=t[6],v=t[10];return n*(u*v-h*d)-a*(c*v-h*m)+o*(c*d-u*m)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],d=t[7],v=t[8],_=t[9],g=t[10],x=t[11],b=t[12],w=t[13],y=t[14],S=t[15],C=n*h-a*u,O=n*m-o*u,A=n*d-c*u,U=a*m-o*h,L=a*d-c*h,I=o*d-c*m,T=v*w-_*b,P=v*y-g*b,F=v*S-x*b,W=_*y-g*w,H=_*S-x*w,$=g*S-x*y,k=C*$-O*H+A*W+U*F-L*P+I*T;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const tt=1/k;return t[0]=(h*$-m*H+d*W)*tt,t[1]=(o*H-a*$-c*W)*tt,t[2]=(w*I-y*L+S*U)*tt,t[3]=(g*L-_*I-x*U)*tt,t[4]=(m*F-u*$-d*P)*tt,t[5]=(n*$-o*F+c*P)*tt,t[6]=(y*A-b*I-S*O)*tt,t[7]=(v*I-g*A+x*O)*tt,t[8]=(u*H-h*F+d*T)*tt,t[9]=(a*F-n*H-c*T)*tt,t[10]=(b*L-w*A+S*C)*tt,t[11]=(_*A-v*L-x*C)*tt,t[12]=(h*P-u*W-m*T)*tt,t[13]=(n*W-a*P+o*T)*tt,t[14]=(w*O-b*U-y*C)*tt,t[15]=(v*U-_*O+g*C)*tt,this}scale(t){const n=this.elements,a=t.x,o=t.y,c=t.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=t.x,h=t.y,m=t.z,d=c*u,v=c*h;return this.set(d*u+a,d*h-o*m,d*m+o*h,0,d*h+o*m,v*h+a,v*m-o*u,0,d*m-o*h,v*m+o*u,c*m*m+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,c,u){return this.set(1,a,c,0,t,1,u,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,c=n._x,u=n._y,h=n._z,m=n._w,d=c+c,v=u+u,_=h+h,g=c*d,x=c*v,b=c*_,w=u*v,y=u*_,S=h*_,C=m*d,O=m*v,A=m*_,U=a.x,L=a.y,I=a.z;return o[0]=(1-(w+S))*U,o[1]=(x+A)*U,o[2]=(b-O)*U,o[3]=0,o[4]=(x-A)*L,o[5]=(1-(g+S))*L,o[6]=(y+C)*L,o[7]=0,o[8]=(b+O)*I,o[9]=(y-C)*I,o[10]=(1-(g+w))*I,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;t.x=o[12],t.y=o[13],t.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=Dr.set(o[0],o[1],o[2]).length();const h=Dr.set(o[4],o[5],o[6]).length(),m=Dr.set(o[8],o[9],o[10]).length();c<0&&(u=-u),Pi.copy(this);const d=1/u,v=1/h,_=1/m;return Pi.elements[0]*=d,Pi.elements[1]*=d,Pi.elements[2]*=d,Pi.elements[4]*=v,Pi.elements[5]*=v,Pi.elements[6]*=v,Pi.elements[8]*=_,Pi.elements[9]*=_,Pi.elements[10]*=_,n.setFromRotationMatrix(Pi),a.x=u,a.y=h,a.z=m,this}makePerspective(t,n,a,o,c,u,h=ta,m=!1){const d=this.elements,v=2*c/(n-t),_=2*c/(a-o),g=(n+t)/(n-t),x=(a+o)/(a-o);let b,w;if(m)b=c/(u-c),w=u*c/(u-c);else if(h===ta)b=-(u+c)/(u-c),w=-2*u*c/(u-c);else if(h===bl)b=-u/(u-c),w=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return d[0]=v,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=_,d[9]=x,d[13]=0,d[2]=0,d[6]=0,d[10]=b,d[14]=w,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,n,a,o,c,u,h=ta,m=!1){const d=this.elements,v=2/(n-t),_=2/(a-o),g=-(n+t)/(n-t),x=-(a+o)/(a-o);let b,w;if(m)b=1/(u-c),w=u/(u-c);else if(h===ta)b=-2/(u-c),w=-(u+c)/(u-c);else if(h===bl)b=-1/(u-c),w=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return d[0]=v,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=_,d[9]=0,d[13]=x,d[2]=0,d[6]=0,d[10]=b,d[14]=w,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}};Du.prototype.isMatrix4=!0;let Ee=Du;const Dr=new G,Pi=new Ee,yb=new G(0,0,0),Mb=new G(1,1,1),ls=new G,Vc=new G,hi=new G,Jv=new Ee,Qv=new ia;class gs{constructor(t=0,n=0,a=0,o=gs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,c=o[0],u=o[4],h=o[8],m=o[1],d=o[5],v=o[9],_=o[2],g=o[6],x=o[10];switch(n){case"XYZ":this._y=Math.asin(ve(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,x),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(h,x),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(ve(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,x),this._z=Math.atan2(-u,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-ve(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,d));break;case"YZX":this._z=Math.asin(ve(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,d),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,x));break;case"XZY":this._z=Math.asin(-ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-v,x),this._y=0);break;default:ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return Jv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Jv,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Qv.setFromEuler(this),this.setFromQuaternion(Qv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gs.DEFAULT_ORDER="XYZ";class Np{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bb=0;const jv=new G,Ur=new ia,ba=new Ee,kc=new G,$o=new G,Eb=new G,Tb=new ia,$v=new G(1,0,0),t_=new G(0,1,0),e_=new G(0,0,1),n_={type:"added"},Ab={type:"removed"},Lr={type:"childadded",child:null},$h={type:"childremoved",child:null};class Mn extends Zs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bb++}),this.uuid=Ks(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mn.DEFAULT_UP.clone();const t=new G,n=new gs,a=new ia,o=new G(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ee},normalMatrix:{value:new oe}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=Mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Np,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Ur.setFromAxisAngle(t,n),this.quaternion.multiply(Ur),this}rotateOnWorldAxis(t,n){return Ur.setFromAxisAngle(t,n),this.quaternion.premultiply(Ur),this}rotateX(t){return this.rotateOnAxis($v,t)}rotateY(t){return this.rotateOnAxis(t_,t)}rotateZ(t){return this.rotateOnAxis(e_,t)}translateOnAxis(t,n){return jv.copy(t).applyQuaternion(this.quaternion),this.position.add(jv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis($v,t)}translateY(t){return this.translateOnAxis(t_,t)}translateZ(t){return this.translateOnAxis(e_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ba.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?kc.copy(t):kc.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),$o.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ba.lookAt($o,kc,this.up):ba.lookAt(kc,$o,this.up),this.quaternion.setFromRotationMatrix(ba),o&&(ba.extractRotation(o.matrixWorld),Ur.setFromRotationMatrix(ba),this.quaternion.premultiply(Ur.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(n_),Lr.child=t,this.dispatchEvent(Lr),Lr.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(Ab),$h.child=t,this.dispatchEvent($h),$h.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ba.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ba.multiply(t.parent.matrixWorld)),t.applyMatrix4(ba),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(n_),Lr.child=t,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(t,n);if(u!==void 0)return u}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($o,t,Eb),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($o,Tb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,o=t.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const o=this.parent;if(t===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,h=c.length;u<h;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let d=0,v=m.length;d<v;d++){const _=m[d];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,d=this.material.length;m<d;m++)h.push(c(t.materials,this.material[m]));o.material=h}else o.material=c(t.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];o.animations.push(c(t.animations,m))}}if(n){const h=u(t.geometries),m=u(t.materials),d=u(t.textures),v=u(t.images),_=u(t.shapes),g=u(t.skeletons),x=u(t.animations),b=u(t.nodes);h.length>0&&(a.geometries=h),m.length>0&&(a.materials=m),d.length>0&&(a.textures=d),v.length>0&&(a.images=v),_.length>0&&(a.shapes=_),g.length>0&&(a.skeletons=g),x.length>0&&(a.animations=x),b.length>0&&(a.nodes=b)}return a.object=o,a;function u(h){const m=[];for(const d in h){const v=h[d];delete v.metadata,m.push(v)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Mn.DEFAULT_UP=new G(0,1,0);Mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ua extends Mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wb={type:"move"};class td{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ua,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ua,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ua,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,c=null,u=null;const h=this._targetRay,m=this._grip,d=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(d&&t.hand){u=!0;for(const w of t.hand.values()){const y=n.getJointPose(w,a),S=this._getHandJoint(d,w);y!==null&&(S.matrix.fromArray(y.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=y.radius),S.visible=y!==null}const v=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],g=v.position.distanceTo(_.position),x=.02,b=.005;d.inputState.pinching&&g>x+b?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&g<=x-b&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));h!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(wb)))}return h!==null&&(h.visible=o!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=u!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new Ua;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const Ax={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cs={h:0,s:0,l:0},Xc={h:0,s:0,l:0};function ed(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class te{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ae.colorSpaceToWorking(this,n),this}setRGB(t,n,a,o=Ae.workingColorSpace){return this.r=t,this.g=n,this.b=a,Ae.colorSpaceToWorking(this,o),this}setHSL(t,n,a,o=Ae.workingColorSpace){if(t=Dp(t,1),n=ve(n,0,1),a=ve(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=ed(u,c,t+1/3),this.g=ed(u,c,t),this.b=ed(u,c,t-1/3)}return Ae.colorSpaceToWorking(this,o),this}setStyle(t,n=ti){function a(c){c!==void 0&&parseFloat(c)<1&&ae("Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const u=o[1],h=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:ae("Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);ae("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ti){const a=Ax[t.toLowerCase()];return a!==void 0?this.setHex(a,n):ae("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Na(t.r),this.g=Na(t.g),this.b=Na(t.b),this}copyLinearToSRGB(t){return this.r=Qr(t.r),this.g=Qr(t.g),this.b=Qr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ti){return Ae.workingToColorSpace(Bn.copy(this),t),Math.round(ve(Bn.r*255,0,255))*65536+Math.round(ve(Bn.g*255,0,255))*256+Math.round(ve(Bn.b*255,0,255))}getHexString(t=ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ae.workingColorSpace){Ae.workingToColorSpace(Bn.copy(this),n);const a=Bn.r,o=Bn.g,c=Bn.b,u=Math.max(a,o,c),h=Math.min(a,o,c);let m,d;const v=(h+u)/2;if(h===u)m=0,d=0;else{const _=u-h;switch(d=v<=.5?_/(u+h):_/(2-u-h),u){case a:m=(o-c)/_+(o<c?6:0);break;case o:m=(c-a)/_+2;break;case c:m=(a-o)/_+4;break}m/=6}return t.h=m,t.s=d,t.l=v,t}getRGB(t,n=Ae.workingColorSpace){return Ae.workingToColorSpace(Bn.copy(this),n),t.r=Bn.r,t.g=Bn.g,t.b=Bn.b,t}getStyle(t=ti){Ae.workingToColorSpace(Bn.copy(this),t);const n=Bn.r,a=Bn.g,o=Bn.b;return t!==ti?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(cs),this.setHSL(cs.h+t,cs.s+n,cs.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(cs),t.getHSL(Xc);const a=ml(cs.h,Xc.h,n),o=ml(cs.s,Xc.s,n),c=ml(cs.l,Xc.l,n);return this.setHSL(a,o,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new te;te.NAMES=Ax;class Op{constructor(t,n=1,a=1e3){this.isFog=!0,this.name="",this.color=new te(t),this.near=n,this.far=a}clone(){return new Op(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class i_ extends Mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gs,this.environmentIntensity=1,this.environmentRotation=new gs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Ii=new G,Ea=new G,nd=new G,Ta=new G,Nr=new G,Or=new G,a_=new G,id=new G,ad=new G,sd=new G,rd=new an,od=new an,ld=new an;class Bi{constructor(t=new G,n=new G,a=new G){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),Ii.subVectors(t,n),o.cross(Ii);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(t,n,a,o,c){Ii.subVectors(o,n),Ea.subVectors(a,n),nd.subVectors(t,n);const u=Ii.dot(Ii),h=Ii.dot(Ea),m=Ii.dot(nd),d=Ea.dot(Ea),v=Ea.dot(nd),_=u*d-h*h;if(_===0)return c.set(0,0,0),null;const g=1/_,x=(d*m-h*v)*g,b=(u*v-h*m)*g;return c.set(1-x-b,b,x)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,Ta)===null?!1:Ta.x>=0&&Ta.y>=0&&Ta.x+Ta.y<=1}static getInterpolation(t,n,a,o,c,u,h,m){return this.getBarycoord(t,n,a,o,Ta)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Ta.x),m.addScaledVector(u,Ta.y),m.addScaledVector(h,Ta.z),m)}static getInterpolatedAttribute(t,n,a,o,c,u){return rd.setScalar(0),od.setScalar(0),ld.setScalar(0),rd.fromBufferAttribute(t,n),od.fromBufferAttribute(t,a),ld.fromBufferAttribute(t,o),u.setScalar(0),u.addScaledVector(rd,c.x),u.addScaledVector(od,c.y),u.addScaledVector(ld,c.z),u}static isFrontFacing(t,n,a,o){return Ii.subVectors(a,n),Ea.subVectors(t,n),Ii.cross(Ea).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ii.subVectors(this.c,this.b),Ea.subVectors(this.a,this.b),Ii.cross(Ea).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Bi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,c){return Bi.getInterpolation(t,this.a,this.b,this.c,n,a,o,c)}containsPoint(t){return Bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,c=this.c;let u,h;Nr.subVectors(o,a),Or.subVectors(c,a),id.subVectors(t,a);const m=Nr.dot(id),d=Or.dot(id);if(m<=0&&d<=0)return n.copy(a);ad.subVectors(t,o);const v=Nr.dot(ad),_=Or.dot(ad);if(v>=0&&_<=v)return n.copy(o);const g=m*_-v*d;if(g<=0&&m>=0&&v<=0)return u=m/(m-v),n.copy(a).addScaledVector(Nr,u);sd.subVectors(t,c);const x=Nr.dot(sd),b=Or.dot(sd);if(b>=0&&x<=b)return n.copy(c);const w=x*d-m*b;if(w<=0&&d>=0&&b<=0)return h=d/(d-b),n.copy(a).addScaledVector(Or,h);const y=v*b-x*_;if(y<=0&&_-v>=0&&x-b>=0)return a_.subVectors(c,o),h=(_-v)/(_-v+(x-b)),n.copy(o).addScaledVector(a_,h);const S=1/(y+w+g);return u=w*S,h=g*S,n.copy(a).addScaledVector(Nr,u).addScaledVector(Or,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Js{constructor(t=new G(1/0,1/0,1/0),n=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(zi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(zi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=zi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let u=0,h=c.count;u<h;u++)t.isMesh===!0?t.getVertexPosition(u,zi):zi.fromBufferAttribute(c,u),zi.applyMatrix4(t.matrixWorld),this.expandByPoint(zi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Wc.copy(a.boundingBox)),Wc.applyMatrix4(t.matrixWorld),this.union(Wc)}const o=t.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,zi),zi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(tl),qc.subVectors(this.max,tl),Pr.subVectors(t.a,tl),Ir.subVectors(t.b,tl),zr.subVectors(t.c,tl),us.subVectors(Ir,Pr),fs.subVectors(zr,Ir),Is.subVectors(Pr,zr);let n=[0,-us.z,us.y,0,-fs.z,fs.y,0,-Is.z,Is.y,us.z,0,-us.x,fs.z,0,-fs.x,Is.z,0,-Is.x,-us.y,us.x,0,-fs.y,fs.x,0,-Is.y,Is.x,0];return!cd(n,Pr,Ir,zr,qc)||(n=[1,0,0,0,1,0,0,0,1],!cd(n,Pr,Ir,zr,qc))?!1:(Yc.crossVectors(us,fs),n=[Yc.x,Yc.y,Yc.z],cd(n,Pr,Ir,zr,qc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Aa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Aa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Aa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Aa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Aa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Aa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Aa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Aa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Aa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Aa=[new G,new G,new G,new G,new G,new G,new G,new G],zi=new G,Wc=new Js,Pr=new G,Ir=new G,zr=new G,us=new G,fs=new G,Is=new G,tl=new G,qc=new G,Yc=new G,zs=new G;function cd(r,t,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){zs.fromArray(r,c);const h=o.x*Math.abs(zs.x)+o.y*Math.abs(zs.y)+o.z*Math.abs(zs.z),m=t.dot(zs),d=n.dot(zs),v=a.dot(zs);if(Math.max(-Math.max(m,d,v),Math.min(m,d,v))>h)return!1}return!0}const yn=new G,Zc=new Wt;let Rb=0;class Gi extends Zs{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rb++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=ZM,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Zc.fromBufferAttribute(this,n),Zc.applyMatrix3(t),this.setXY(n,Zc.x,Zc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix3(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix4(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyNormalMatrix(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.transformDirection(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=qr(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=kn(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=qr(n,this.array)),n}setX(t,n){return this.normalized&&(n=kn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=qr(n,this.array)),n}setY(t,n){return this.normalized&&(n=kn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=qr(n,this.array)),n}setZ(t,n){return this.normalized&&(n=kn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=qr(n,this.array)),n}setW(t,n){return this.normalized&&(n=kn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=kn(n,this.array),a=kn(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=kn(n,this.array),a=kn(a,this.array),o=kn(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t*=this.itemSize,this.normalized&&(n=kn(n,this.array),a=kn(a,this.array),o=kn(o,this.array),c=kn(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class wx extends Gi{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class Rx extends Gi{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class Re extends Gi{constructor(t,n,a){super(new Float32Array(t),n,a)}}const Cb=new Js,el=new G,ud=new G;class no{constructor(t=new G,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):Cb.setFromPoints(t).getCenter(a);let o=0;for(let c=0,u=t.length;c<u;c++)o=Math.max(o,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;el.subVectors(t,this.center);const n=el.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(el,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ud.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(el.copy(t.center).add(ud)),this.expandByPoint(el.copy(t.center).sub(ud))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Db=0;const Ai=new Ee,fd=new Mn,Br=new G,di=new Js,nl=new Js,Rn=new G;class dn extends Zs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Db++}),this.uuid=Ks(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(KM(t)?Rx:wx)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new oe().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ai.makeRotationFromQuaternion(t),this.applyMatrix4(Ai),this}rotateX(t){return Ai.makeRotationX(t),this.applyMatrix4(Ai),this}rotateY(t){return Ai.makeRotationY(t),this.applyMatrix4(Ai),this}rotateZ(t){return Ai.makeRotationZ(t),this.applyMatrix4(Ai),this}translate(t,n,a){return Ai.makeTranslation(t,n,a),this.applyMatrix4(Ai),this}scale(t,n,a){return Ai.makeScale(t,n,a),this.applyMatrix4(Ai),this}lookAt(t){return fd.lookAt(t),fd.updateMatrix(),this.applyMatrix4(fd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=t.length;o<c;o++){const u=t[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Re(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const c=t[o];n.setXYZ(o,c.x,c.y,c.z||0)}t.length>n.count&&ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Js);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];di.setFromBufferAttribute(c),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new no);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){const a=this.boundingSphere.center;if(di.setFromBufferAttribute(t),n)for(let c=0,u=n.length;c<u;c++){const h=n[c];nl.setFromBufferAttribute(h),this.morphTargetsRelative?(Rn.addVectors(di.min,nl.min),di.expandByPoint(Rn),Rn.addVectors(di.max,nl.max),di.expandByPoint(Rn)):(di.expandByPoint(nl.min),di.expandByPoint(nl.max))}di.getCenter(a);let o=0;for(let c=0,u=t.count;c<u;c++)Rn.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(Rn));if(n)for(let c=0,u=n.length;c<u;c++){const h=n[c],m=this.morphTargetsRelative;for(let d=0,v=h.count;d<v;d++)Rn.fromBufferAttribute(h,d),m&&(Br.fromBufferAttribute(t,d),Rn.add(Br)),o=Math.max(o,a.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new Gi(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const h=[],m=[];for(let T=0;T<a.count;T++)h[T]=new G,m[T]=new G;const d=new G,v=new G,_=new G,g=new Wt,x=new Wt,b=new Wt,w=new G,y=new G;function S(T,P,F){d.fromBufferAttribute(a,T),v.fromBufferAttribute(a,P),_.fromBufferAttribute(a,F),g.fromBufferAttribute(c,T),x.fromBufferAttribute(c,P),b.fromBufferAttribute(c,F),v.sub(d),_.sub(d),x.sub(g),b.sub(g);const W=1/(x.x*b.y-b.x*x.y);isFinite(W)&&(w.copy(v).multiplyScalar(b.y).addScaledVector(_,-x.y).multiplyScalar(W),y.copy(_).multiplyScalar(x.x).addScaledVector(v,-b.x).multiplyScalar(W),h[T].add(w),h[P].add(w),h[F].add(w),m[T].add(y),m[P].add(y),m[F].add(y))}let C=this.groups;C.length===0&&(C=[{start:0,count:t.count}]);for(let T=0,P=C.length;T<P;++T){const F=C[T],W=F.start,H=F.count;for(let $=W,k=W+H;$<k;$+=3)S(t.getX($+0),t.getX($+1),t.getX($+2))}const O=new G,A=new G,U=new G,L=new G;function I(T){U.fromBufferAttribute(o,T),L.copy(U);const P=h[T];O.copy(P),O.sub(U.multiplyScalar(U.dot(P))).normalize(),A.crossVectors(L,P);const W=A.dot(m[T])<0?-1:1;u.setXYZW(T,O.x,O.y,O.z,W)}for(let T=0,P=C.length;T<P;++T){const F=C[T],W=F.start,H=F.count;for(let $=W,k=W+H;$<k;$+=3)I(t.getX($+0)),I(t.getX($+1)),I(t.getX($+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new Gi(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let g=0,x=a.count;g<x;g++)a.setXYZ(g,0,0,0);const o=new G,c=new G,u=new G,h=new G,m=new G,d=new G,v=new G,_=new G;if(t)for(let g=0,x=t.count;g<x;g+=3){const b=t.getX(g+0),w=t.getX(g+1),y=t.getX(g+2);o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),h.fromBufferAttribute(a,b),m.fromBufferAttribute(a,w),d.fromBufferAttribute(a,y),h.add(v),m.add(v),d.add(v),a.setXYZ(b,h.x,h.y,h.z),a.setXYZ(w,m.x,m.y,m.z),a.setXYZ(y,d.x,d.y,d.z)}else for(let g=0,x=n.count;g<x;g+=3)o.fromBufferAttribute(n,g+0),c.fromBufferAttribute(n,g+1),u.fromBufferAttribute(n,g+2),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),a.setXYZ(g+0,v.x,v.y,v.z),a.setXYZ(g+1,v.x,v.y,v.z),a.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)Rn.fromBufferAttribute(t,n),Rn.normalize(),t.setXYZ(n,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function t(h,m){const d=h.array,v=h.itemSize,_=h.normalized,g=new d.constructor(m.length*v);let x=0,b=0;for(let w=0,y=m.length;w<y;w++){h.isInterleavedBufferAttribute?x=m[w]*h.data.stride+h.offset:x=m[w]*v;for(let S=0;S<v;S++)g[b++]=d[x++]}return new Gi(g,v,_)}if(this.index===null)return ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new dn,a=this.index.array,o=this.attributes;for(const h in o){const m=o[h],d=t(m,a);n.setAttribute(h,d)}const c=this.morphAttributes;for(const h in c){const m=[],d=c[h];for(let v=0,_=d.length;v<_;v++){const g=d[v],x=t(g,a);m.push(x)}n.morphAttributes[h]=m}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let h=0,m=u.length;h<m;h++){const d=u[h];n.addGroup(d.start,d.count,d.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const d=a[m];t.data.attributes[m]=d.toJSON(t.data)}const o={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],v=[];for(let _=0,g=d.length;_<g;_++){const x=d[_];v.push(x.toJSON(t.data))}v.length>0&&(o[m]=v,c=!0)}c&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(t.data.groups=JSON.parse(JSON.stringify(u)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere=h.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const o=t.attributes;for(const d in o){const v=o[d];this.setAttribute(d,v.clone(n))}const c=t.morphAttributes;for(const d in c){const v=[],_=c[d];for(let g=0,x=_.length;g<x;g++)v.push(_[g].clone(n));this.morphAttributes[d]=v}this.morphTargetsRelative=t.morphTargetsRelative;const u=t.groups;for(let d=0,v=u.length;d<v;d++){const _=u[d];this.addGroup(_.start,_.count,_.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hd=new G,Ub=new G,Lb=new oe;class Ra{constructor(t=new G(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=hd.subVectors(a,n).cross(Ub.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const o=t.delta(hd),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(t.start).addScaledVector(o,u)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||Lb.getNormalMatrix(t),o=this.coplanarPoint(hd).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Nb=0;class io extends Zs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nb++}),this.uuid=Ks(),this.name="",this.type="Material",this.blending=dl,this.side=Xs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lx,this.blendDst=cx,this.blendEquation=Wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=Sl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=GM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zh,this.stencilZFail=Zh,this.stencilZPass=Zh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){ae(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){ae(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const h in c){const m=c[h];delete m.metadata,u.push(m)}return u}if(n){const c=o(t.textures),u=o(t.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new te().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new Ra().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Wt().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Wt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const wa=new G,dd=new G,Kc=new G,Jc=new G;class Pp{constructor(t=new G,n=new G(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wa)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=wa.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(wa.copy(this.origin).addScaledVector(this.direction,n),wa.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){dd.copy(t).add(n).multiplyScalar(.5),Kc.copy(n).sub(t).normalize(),Jc.copy(this.origin).sub(dd);const c=t.distanceTo(n)*.5,u=-this.direction.dot(Kc),h=Jc.dot(this.direction),m=-Jc.dot(Kc),d=Jc.lengthSq(),v=Math.abs(1-u*u);let _,g,x,b;if(v>0)if(_=u*m-h,g=u*h-m,b=c*v,_>=0)if(g>=-b)if(g<=b){const w=1/v;_*=w,g*=w,x=_*(_+u*g+2*h)+g*(u*_+g+2*m)+d}else g=c,_=Math.max(0,-(u*g+h)),x=-_*_+g*(g+2*m)+d;else g=-c,_=Math.max(0,-(u*g+h)),x=-_*_+g*(g+2*m)+d;else g<=-b?(_=Math.max(0,-(-u*c+h)),g=_>0?-c:Math.min(Math.max(-c,-m),c),x=-_*_+g*(g+2*m)+d):g<=b?(_=0,g=Math.min(Math.max(-c,-m),c),x=g*(g+2*m)+d):(_=Math.max(0,-(u*c+h)),g=_>0?c:Math.min(Math.max(-c,-m),c),x=-_*_+g*(g+2*m)+d);else g=u>0?-c:c,_=Math.max(0,-(u*g+h)),x=-_*_+g*(g+2*m)+d;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(dd).addScaledVector(Kc,g),x}intersectSphere(t,n){if(t.radius<0)return null;wa.subVectors(t.center,this.origin);const a=wa.dot(this.direction),o=wa.dot(wa)-a*a,c=t.radius*t.radius;if(o>c)return null;const u=Math.sqrt(c-o),h=a-u,m=a+u;return m<0?null:h<0?this.at(m,n):this.at(h,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,c,u,h,m;const d=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return d>=0?(a=(t.min.x-g.x)*d,o=(t.max.x-g.x)*d):(a=(t.max.x-g.x)*d,o=(t.min.x-g.x)*d),v>=0?(c=(t.min.y-g.y)*v,u=(t.max.y-g.y)*v):(c=(t.max.y-g.y)*v,u=(t.min.y-g.y)*v),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),_>=0?(h=(t.min.z-g.z)*_,m=(t.max.z-g.z)*_):(h=(t.max.z-g.z)*_,m=(t.min.z-g.z)*_),a>m||h>o)||((h>a||a!==a)&&(a=h),(m<o||o!==o)&&(o=m),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,wa)!==null}intersectTriangle(t,n,a,o,c){const u=this.origin,h=this.direction,m=h.x,d=h.y,v=h.z,_=t.x-u.x,g=t.y-u.y,x=t.z-u.z,b=n.x-u.x,w=n.y-u.y,y=n.z-u.z,S=a.x-u.x,C=a.y-u.y,O=a.z-u.z,A=Math.abs(m),U=Math.abs(d),L=Math.abs(v);let I,T,P,F,W,H,$,k,tt,B,X,q;if(A>=U&&A>=L?(P=m,H=_,tt=b,q=S,m>=0?(I=d,T=v,F=g,W=x,$=w,k=y,B=C,X=O):(I=v,T=d,F=x,W=g,$=y,k=w,B=O,X=C)):U>=L?(P=d,H=g,tt=w,q=C,d>=0?(I=v,T=m,F=x,W=_,$=y,k=b,B=O,X=S):(I=m,T=v,F=_,W=x,$=b,k=y,B=S,X=O)):(P=v,H=x,tt=y,q=O,v>=0?(I=m,T=d,F=_,W=g,$=b,k=w,B=S,X=C):(I=d,T=m,F=g,W=_,$=w,k=b,B=C,X=S)),P===0)return null;const nt=I/P,rt=T/P,N=1/P,et=F-nt*H,Q=W-rt*H,j=$-nt*tt,bt=k-rt*tt,wt=B-nt*q,st=X-rt*q,pt=wt*bt-st*j,Tt=et*st-Q*wt,It=j*Q-bt*et;if(o){if(pt<0||Tt<0||It<0)return null}else if((pt<0||Tt<0||It<0)&&(pt>0||Tt>0||It>0))return null;const At=pt+Tt+It;if(At===0)return null;const ee=N*(pt*H+Tt*tt+It*q);return(At>0?ee<0:ee>0)?null:this.at(ee/At,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Cx extends io{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gs,this.combine=ux,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const s_=new Ee,Bs=new Pp,Qc=new no,r_=new G,jc=new G,$c=new G,tu=new G,pd=new G,eu=new G,o_=new G,nu=new G;class Ge extends Mn{constructor(t=new dn,n=new Cx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const h=this.morphTargetInfluences;if(c&&h){eu.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const v=h[m],_=c[m];v!==0&&(pd.fromBufferAttribute(_,t),u?eu.addScaledVector(pd,v):eu.addScaledVector(pd.sub(n),v))}n.add(eu)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Qc.copy(a.boundingSphere),Qc.applyMatrix4(c),Bs.copy(t.ray).recast(t.near),!(Qc.containsPoint(Bs.origin)===!1&&(Bs.intersectSphere(Qc,r_)===null||Bs.origin.distanceToSquared(r_)>(t.far-t.near)**2))&&(s_.copy(c).invert(),Bs.copy(t.ray).applyMatrix4(s_),!(a.boundingBox!==null&&Bs.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Bs)))}_computeIntersections(t,n,a){let o;const c=this.geometry,u=this.material,h=c.index,m=c.attributes.position,d=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,x=c.drawRange;if(h!==null)if(Array.isArray(u))for(let b=0,w=g.length;b<w;b++){const y=g[b],S=u[y.materialIndex],C=Math.max(y.start,x.start),O=Math.min(h.count,Math.min(y.start+y.count,x.start+x.count));for(let A=C,U=O;A<U;A+=3){const L=h.getX(A),I=h.getX(A+1),T=h.getX(A+2);o=iu(this,S,t,a,d,v,_,L,I,T),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=y.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),w=Math.min(h.count,x.start+x.count);for(let y=b,S=w;y<S;y+=3){const C=h.getX(y),O=h.getX(y+1),A=h.getX(y+2);o=iu(this,u,t,a,d,v,_,C,O,A),o&&(o.faceIndex=Math.floor(y/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(u))for(let b=0,w=g.length;b<w;b++){const y=g[b],S=u[y.materialIndex],C=Math.max(y.start,x.start),O=Math.min(m.count,Math.min(y.start+y.count,x.start+x.count));for(let A=C,U=O;A<U;A+=3){const L=A,I=A+1,T=A+2;o=iu(this,S,t,a,d,v,_,L,I,T),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=y.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),w=Math.min(m.count,x.start+x.count);for(let y=b,S=w;y<S;y+=3){const C=y,O=y+1,A=y+2;o=iu(this,u,t,a,d,v,_,C,O,A),o&&(o.faceIndex=Math.floor(y/3),n.push(o))}}}}function Ob(r,t,n,a,o,c,u,h){let m;if(t.side===Wn?m=a.intersectTriangle(u,c,o,!0,h):m=a.intersectTriangle(o,c,u,t.side===Xs,h),m===null)return null;nu.copy(h),nu.applyMatrix4(r.matrixWorld);const d=n.ray.origin.distanceTo(nu);return d<n.near||d>n.far?null:{distance:d,point:nu.clone(),object:r}}function iu(r,t,n,a,o,c,u,h,m,d){r.getVertexPosition(h,jc),r.getVertexPosition(m,$c),r.getVertexPosition(d,tu);const v=Ob(r,t,n,a,jc,$c,tu,o_);if(v){const _=new G;Bi.getBarycoord(o_,jc,$c,tu,_),o&&(v.uv=Bi.getInterpolatedAttribute(o,h,m,d,_,new Wt)),c&&(v.uv1=Bi.getInterpolatedAttribute(c,h,m,d,_,new Wt)),u&&(v.normal=Bi.getInterpolatedAttribute(u,h,m,d,_,new G),v.normal.dot(a.direction)>0&&v.normal.multiplyScalar(-1));const g={a:h,b:m,c:d,normal:new G,materialIndex:0};Bi.getNormal(jc,$c,tu,g.normal),v.face=g,v.barycoord=_}return v}class Dx extends Pn{constructor(t=null,n=1,a=1,o,c,u,h,m,d=On,v=On,_,g){super(null,u,h,m,d,v,o,c,_,g),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class l_ extends Gi{constructor(t,n,a,o=1){super(t,n,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Fr=new Ee,c_=new Ee,au=[],u_=new Js,Pb=new Ee,il=new Ge,al=new no;class wi extends Ge{constructor(t,n,a){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new l_(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<a;o++)this.setMatrixAt(o,Pb)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Js),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Fr),u_.copy(t.boundingBox).applyMatrix4(Fr),this.boundingBox.union(u_)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new no),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Fr),al.copy(t.boundingSphere).applyMatrix4(Fr),this.boundingSphere.union(al)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){return n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const a=n.morphTargetInfluences,o=this.morphTexture.source.data.data,c=a.length+1,u=t*c+1;for(let h=0;h<a.length;h++)a[h]=o[u+h]}raycast(t,n){const a=this.matrixWorld,o=this.count;if(il.geometry=this.geometry,il.material=this.material,il.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),al.copy(this.boundingSphere),al.applyMatrix4(a),t.ray.intersectsSphere(al)!==!1))for(let c=0;c<o;c++){this.getMatrixAt(c,Fr),c_.multiplyMatrices(a,Fr),il.matrixWorld=c_,il.raycast(t,au);for(let u=0,h=au.length;u<h;u++){const m=au[u];m.instanceId=c,m.object=this,n.push(m)}au.length=0}}setColorAt(t,n){return this.instanceColor===null&&(this.instanceColor=new l_(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,n){return n.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,n){const a=n.morphTargetInfluences,o=a.length+1;this.morphTexture===null&&(this.morphTexture=new Dx(new Float32Array(o*this.count),o,this.count,Ep,Fi));const c=this.morphTexture.source.data.data;let u=0;for(let d=0;d<a.length;d++)u+=a[d];const h=this.geometry.morphTargetsRelative?1:1-u,m=o*t;return c[m]=h,c.set(a,m+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Fs=new no,Ib=new Wt(.5,.5),su=new G;class Ip{constructor(t=new Ra,n=new Ra,a=new Ra,o=new Ra,c=new Ra,u=new Ra){this.planes=[t,n,a,o,c,u]}set(t,n,a,o,c,u){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(a),h[3].copy(o),h[4].copy(c),h[5].copy(u),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=ta,a=!1){const o=this.planes,c=t.elements,u=c[0],h=c[1],m=c[2],d=c[3],v=c[4],_=c[5],g=c[6],x=c[7],b=c[8],w=c[9],y=c[10],S=c[11],C=c[12],O=c[13],A=c[14],U=c[15];if(o[0].setComponents(d-u,x-v,S-b,U-C).normalize(),o[1].setComponents(d+u,x+v,S+b,U+C).normalize(),o[2].setComponents(d+h,x+_,S+w,U+O).normalize(),o[3].setComponents(d-h,x-_,S-w,U-O).normalize(),a)o[4].setComponents(m,g,y,A).normalize(),o[5].setComponents(d-m,x-g,S-y,U-A).normalize();else if(o[4].setComponents(d-m,x-g,S-y,U-A).normalize(),n===ta)o[5].setComponents(d+m,x+g,S+y,U+A).normalize();else if(n===bl)o[5].setComponents(m,g,y,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fs)}intersectsSprite(t){Fs.center.set(0,0,0);const n=Ib.distanceTo(t.center);return Fs.radius=.7071067811865476+n,Fs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fs)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(su.x=o.normal.x>0?t.max.x:t.min.x,su.y=o.normal.y>0?t.max.y:t.min.y,su.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(su)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zb extends io{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const f_=new Ee,up=new Pp,ru=new no,ou=new G;class Bb extends Mn{constructor(t=new dn,n=new zb){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.matrixWorld,c=t.params.Points.threshold,u=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),ru.copy(a.boundingSphere),ru.applyMatrix4(o),ru.radius+=c,t.ray.intersectsSphere(ru)===!1)return;f_.copy(o).invert(),up.copy(t.ray).applyMatrix4(f_);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=h*h,d=a.index,_=a.attributes.position;if(d!==null){const g=Math.max(0,u.start),x=Math.min(d.count,u.start+u.count);for(let b=g,w=x;b<w;b++){const y=d.getX(b);ou.fromBufferAttribute(_,y),h_(ou,y,m,o,t,n,this)}}else{const g=Math.max(0,u.start),x=Math.min(_.count,u.start+u.count);for(let b=g,w=x;b<w;b++)ou.fromBufferAttribute(_,b),h_(ou,b,m,o,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function h_(r,t,n,a,o,c,u){const h=up.distanceSqToPoint(r);if(h<n){const m=new G;up.closestPointToPoint(r,m),m.applyMatrix4(a);const d=o.ray.origin.distanceTo(m);if(d<o.near||d>o.far)return;c.push({distance:d,distanceToRay:Math.sqrt(h),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:u})}}class Ux extends Pn{constructor(t=[],n=Ws,a,o,c,u,h,m,d,v){super(t,n,a,o,c,u,h,m,d,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fb extends Pn{constructor(t,n,a,o,c,u,h,m,d){super(t,n,a,o,c,u,h,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tl extends Pn{constructor(t,n,a=na,o,c,u,h=On,m=On,d,v=Oa,_=1){if(v!==Oa&&v!==Vs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:n,depth:_};super(g,o,c,u,h,m,v,a,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Lp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}}class Hb extends Tl{constructor(t,n=na,a=Ws,o,c,u=On,h=On,m,d=Oa){const v={width:t,height:t,depth:1},_=[v,v,v,v,v,v];super(t,t,n,a,o,c,u,h,m,d),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Lx extends Pn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Cl extends dn{constructor(t=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const h=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const m=[],d=[],v=[],_=[];let g=0,x=0;b("z","y","x",-1,-1,a,n,t,u,c,0),b("z","y","x",1,-1,a,n,-t,u,c,1),b("x","z","y",1,1,t,a,n,o,u,2),b("x","z","y",1,-1,t,a,-n,o,u,3),b("x","y","z",1,-1,t,n,a,o,c,4),b("x","y","z",-1,-1,t,n,-a,o,c,5),this.setIndex(m),this.setAttribute("position",new Re(d,3)),this.setAttribute("normal",new Re(v,3)),this.setAttribute("uv",new Re(_,2));function b(w,y,S,C,O,A,U,L,I,T,P){const F=A/I,W=U/T,H=A/2,$=U/2,k=L/2,tt=I+1,B=T+1;let X=0,q=0;const nt=new G;for(let rt=0;rt<B;rt++){const N=rt*W-$;for(let et=0;et<tt;et++){const Q=et*F-H;nt[w]=Q*C,nt[y]=N*O,nt[S]=k,d.push(nt.x,nt.y,nt.z),nt[w]=0,nt[y]=0,nt[S]=L>0?1:-1,v.push(nt.x,nt.y,nt.z),_.push(et/I),_.push(1-rt/T),X+=1}}for(let rt=0;rt<T;rt++)for(let N=0;N<I;N++){const et=g+N+tt*rt,Q=g+N+tt*(rt+1),j=g+(N+1)+tt*(rt+1),bt=g+(N+1)+tt*rt;m.push(et,Q,bt),m.push(Q,j,bt),q+=6}h.addGroup(x,q,P),x+=q,g+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class jr extends dn{constructor(t=1,n=1,a=1,o=32,c=1,u=!1,h=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:o,heightSegments:c,openEnded:u,thetaStart:h,thetaLength:m};const d=this;o=Math.floor(o),c=Math.floor(c);const v=[],_=[],g=[],x=[];let b=0;const w=[],y=a/2;let S=0;C(),u===!1&&(t>0&&O(!0),n>0&&O(!1)),this.setIndex(v),this.setAttribute("position",new Re(_,3)),this.setAttribute("normal",new Re(g,3)),this.setAttribute("uv",new Re(x,2));function C(){const A=new G,U=new G;let L=0;const I=(n-t)/a;for(let T=0;T<=c;T++){const P=[],F=T/c,W=F*(n-t)+t;for(let H=0;H<=o;H++){const $=H/o,k=$*m+h,tt=Math.sin(k),B=Math.cos(k);U.x=W*tt,U.y=-F*a+y,U.z=W*B,_.push(U.x,U.y,U.z),A.set(tt,I,B).normalize(),g.push(A.x,A.y,A.z),x.push($,1-F),P.push(b++)}w.push(P)}for(let T=0;T<o;T++)for(let P=0;P<c;P++){const F=w[P][T],W=w[P+1][T],H=w[P+1][T+1],$=w[P][T+1];(t>0||P!==0)&&(v.push(F,W,$),L+=3),(n>0||P!==c-1)&&(v.push(W,H,$),L+=3)}d.addGroup(S,L,0),S+=L}function O(A){const U=b,L=new Wt,I=new G;let T=0;const P=A===!0?t:n,F=A===!0?1:-1;for(let H=1;H<=o;H++)_.push(0,y*F,0),g.push(0,F,0),x.push(.5,.5),b++;const W=b;for(let H=0;H<=o;H++){const k=H/o*m+h,tt=Math.cos(k),B=Math.sin(k);I.x=P*B,I.y=y*F,I.z=P*tt,_.push(I.x,I.y,I.z),g.push(0,F,0),L.x=tt*.5+.5,L.y=B*.5*F+.5,x.push(L.x,L.y),b++}for(let H=0;H<o;H++){const $=U+H,k=W+H;A===!0?v.push(k,k+1,$):v.push(k+1,k,$),T+=3}d.addGroup(S,T,A===!0?1:2),S+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ru extends jr{constructor(t=1,n=1,a=32,o=1,c=!1,u=0,h=Math.PI*2){super(0,t,n,a,o,c,u,h),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:o,openEnded:c,thetaStart:u,thetaLength:h}}static fromJSON(t){return new Ru(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class zp extends dn{constructor(t=[],n=[],a=1,o=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:a,detail:o};const c=[],u=[];h(o),d(a),v(),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(c.slice(),3)),this.setAttribute("uv",new Re(u,2)),o===0?this.computeVertexNormals():this.normalizeNormals();function h(C){const O=new G,A=new G,U=new G;for(let L=0;L<n.length;L+=3)x(n[L+0],O),x(n[L+1],A),x(n[L+2],U),m(O,A,U,C)}function m(C,O,A,U){const L=U+1,I=[];for(let T=0;T<=L;T++){I[T]=[];const P=C.clone().lerp(A,T/L),F=O.clone().lerp(A,T/L),W=L-T;for(let H=0;H<=W;H++)H===0&&T===L?I[T][H]=P:I[T][H]=P.clone().lerp(F,H/W)}for(let T=0;T<L;T++)for(let P=0;P<2*(L-T)-1;P++){const F=Math.floor(P/2);P%2===0?(g(I[T][F+1]),g(I[T+1][F]),g(I[T][F])):(g(I[T][F+1]),g(I[T+1][F+1]),g(I[T+1][F]))}}function d(C){const O=new G;for(let A=0;A<c.length;A+=3)O.x=c[A+0],O.y=c[A+1],O.z=c[A+2],O.normalize().multiplyScalar(C),c[A+0]=O.x,c[A+1]=O.y,c[A+2]=O.z}function v(){const C=new G;for(let O=0;O<c.length;O+=3){C.x=c[O+0],C.y=c[O+1],C.z=c[O+2];const A=y(C)/2/Math.PI+.5,U=S(C)/Math.PI+.5;u.push(A,1-U)}b(),_()}function _(){for(let C=0;C<u.length;C+=6){const O=u[C+0],A=u[C+2],U=u[C+4],L=Math.max(O,A,U),I=Math.min(O,A,U);L>.9&&I<.1&&(O<.2&&(u[C+0]+=1),A<.2&&(u[C+2]+=1),U<.2&&(u[C+4]+=1))}}function g(C){c.push(C.x,C.y,C.z)}function x(C,O){const A=C*3;O.x=t[A+0],O.y=t[A+1],O.z=t[A+2]}function b(){const C=new G,O=new G,A=new G,U=new G,L=new Wt,I=new Wt,T=new Wt;for(let P=0,F=0;P<c.length;P+=9,F+=6){C.set(c[P+0],c[P+1],c[P+2]),O.set(c[P+3],c[P+4],c[P+5]),A.set(c[P+6],c[P+7],c[P+8]),L.set(u[F+0],u[F+1]),I.set(u[F+2],u[F+3]),T.set(u[F+4],u[F+5]),U.copy(C).add(O).add(A).divideScalar(3);const W=y(U);w(L,F+0,C,W),w(I,F+2,O,W),w(T,F+4,A,W)}}function w(C,O,A,U){U<0&&C.x===1&&(u[O]=C.x-1),A.x===0&&A.z===0&&(u[O]=U/2/Math.PI+.5)}function y(C){return Math.atan2(C.z,-C.x)}function S(C){return Math.atan2(-C.y,Math.sqrt(C.x*C.x+C.z*C.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zp(t.vertices,t.indices,t.radius,t.detail)}}class aa{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ae("Curve: .getPoint() not implemented.")}getPointAt(t,n){const a=this.getUtoTmapping(t);return this.getPoint(a,n)}getPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return n}getSpacedPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPointAt(a/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),c=0;n.push(0);for(let u=1;u<=t;u++)a=this.getPoint(u/t),c+=a.distanceTo(o),n.push(c),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const a=this.getLengths();let o=0;const c=a.length;let u;n?u=n:u=t*a[c-1];let h=0,m=c-1,d;for(;h<=m;)if(o=Math.floor(h+(m-h)/2),d=a[o]-u,d<0)h=o+1;else if(d>0)m=o-1;else{m=o;break}if(o=m,a[o]===u)return o/(c-1);const v=a[o],g=a[o+1]-v,x=(u-v)/g;return(o+x)/(c-1)}getTangent(t,n){let o=t-1e-4,c=t+1e-4;o<0&&(o=0),c>1&&(c=1);const u=this.getPoint(o),h=this.getPoint(c),m=n||(u.isVector2?new Wt:new G);return m.copy(h).sub(u).normalize(),m}getTangentAt(t,n){const a=this.getUtoTmapping(t);return this.getTangent(a,n)}computeFrenetFrames(t,n=!1){const a=new G,o=[],c=[],u=[],h=new G,m=new Ee;for(let x=0;x<=t;x++){const b=x/t;o[x]=this.getTangentAt(b,new G)}c[0]=new G,u[0]=new G;let d=Number.MAX_VALUE;const v=Math.abs(o[0].x),_=Math.abs(o[0].y),g=Math.abs(o[0].z);v<=d&&(d=v,a.set(1,0,0)),_<=d&&(d=_,a.set(0,1,0)),g<=d&&a.set(0,0,1),h.crossVectors(o[0],a).normalize(),c[0].crossVectors(o[0],h),u[0].crossVectors(o[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),u[x]=u[x-1].clone(),h.crossVectors(o[x-1],o[x]),h.length()>Number.EPSILON){h.normalize();const b=Math.acos(ve(o[x-1].dot(o[x]),-1,1));c[x].applyMatrix4(m.makeRotationAxis(h,b))}u[x].crossVectors(o[x],c[x])}if(n===!0){let x=Math.acos(ve(c[0].dot(c[t]),-1,1));x/=t,o[0].dot(h.crossVectors(c[0],c[t]))>0&&(x=-x);for(let b=1;b<=t;b++)c[b].applyMatrix4(m.makeRotationAxis(o[b],x*b)),u[b].crossVectors(o[b],c[b])}return{tangents:o,normals:c,binormals:u}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Bp extends aa{constructor(t=0,n=0,a=1,o=1,c=0,u=Math.PI*2,h=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=c,this.aEndAngle=u,this.aClockwise=h,this.aRotation=m}getPoint(t,n=new Wt){const a=n,o=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const u=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=o;for(;c>o;)c-=o;c<Number.EPSILON&&(u?c=0:c=o),this.aClockwise===!0&&!u&&(c===o?c=-o:c=c-o);const h=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(h),d=this.aY+this.yRadius*Math.sin(h);if(this.aRotation!==0){const v=Math.cos(this.aRotation),_=Math.sin(this.aRotation),g=m-this.aX,x=d-this.aY;m=g*v-x*_+this.aX,d=g*_+x*v+this.aY}return a.set(m,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Gb extends Bp{constructor(t,n,a,o,c,u){super(t,n,a,a,o,c,u),this.isArcCurve=!0,this.type="ArcCurve"}}function Fp(){let r=0,t=0,n=0,a=0;function o(c,u,h,m){r=c,t=h,n=-3*c+3*u-2*h-m,a=2*c-2*u+h+m}return{initCatmullRom:function(c,u,h,m,d){o(u,h,d*(h-c),d*(m-u))},initNonuniformCatmullRom:function(c,u,h,m,d,v,_){let g=(u-c)/d-(h-c)/(d+v)+(h-u)/v,x=(h-u)/v-(m-u)/(v+_)+(m-h)/_;g*=v,x*=v,o(u,h,g,x)},calc:function(c){const u=c*c,h=u*c;return r+t*c+n*u+a*h}}}const d_=new G,p_=new G,md=new Fp,gd=new Fp,vd=new Fp;class Nx extends aa{constructor(t=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=a,this.tension=o}getPoint(t,n=new G){const a=n,o=this.points,c=o.length,u=(c-(this.closed?0:1))*t;let h=Math.floor(u),m=u-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/c)+1)*c:m===0&&h===c-1&&(h=c-2,m=1);let d,v;this.closed||h>0?d=o[(h-1)%c]:(p_.subVectors(o[0],o[1]).add(o[0]),d=p_);const _=o[h%c],g=o[(h+1)%c];if(this.closed||h+2<c?v=o[(h+2)%c]:(d_.subVectors(o[c-1],o[c-2]).add(o[c-1]),v=d_),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let b=Math.pow(d.distanceToSquared(_),x),w=Math.pow(_.distanceToSquared(g),x),y=Math.pow(g.distanceToSquared(v),x);w<1e-4&&(w=1),b<1e-4&&(b=w),y<1e-4&&(y=w),md.initNonuniformCatmullRom(d.x,_.x,g.x,v.x,b,w,y),gd.initNonuniformCatmullRom(d.y,_.y,g.y,v.y,b,w,y),vd.initNonuniformCatmullRom(d.z,_.z,g.z,v.z,b,w,y)}else this.curveType==="catmullrom"&&(md.initCatmullRom(d.x,_.x,g.x,v.x,this.tension),gd.initCatmullRom(d.y,_.y,g.y,v.y,this.tension),vd.initCatmullRom(d.z,_.z,g.z,v.z,this.tension));return a.set(md.calc(m),gd.calc(m),vd.calc(m)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new G().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function m_(r,t,n,a,o){const c=(a-t)*.5,u=(o-n)*.5,h=r*r,m=r*h;return(2*n-2*a+c+u)*m+(-3*n+3*a-2*c-u)*h+c*r+n}function Vb(r,t){const n=1-r;return n*n*t}function kb(r,t){return 2*(1-r)*r*t}function Xb(r,t){return r*r*t}function gl(r,t,n,a){return Vb(r,t)+kb(r,n)+Xb(r,a)}function Wb(r,t){const n=1-r;return n*n*n*t}function qb(r,t){const n=1-r;return 3*n*n*r*t}function Yb(r,t){return 3*(1-r)*r*r*t}function Zb(r,t){return r*r*r*t}function vl(r,t,n,a,o){return Wb(r,t)+qb(r,n)+Yb(r,a)+Zb(r,o)}class Ox extends aa{constructor(t=new Wt,n=new Wt,a=new Wt,o=new Wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new Wt){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(vl(t,o.x,c.x,u.x,h.x),vl(t,o.y,c.y,u.y,h.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Kb extends aa{constructor(t=new G,n=new G,a=new G,o=new G){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new G){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(vl(t,o.x,c.x,u.x,h.x),vl(t,o.y,c.y,u.y,h.y),vl(t,o.z,c.z,u.z,h.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Px extends aa{constructor(t=new Wt,n=new Wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Wt){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Wt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jb extends aa{constructor(t=new G,n=new G){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new G){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new G){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ix extends aa{constructor(t=new Wt,n=new Wt,a=new Wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new Wt){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(gl(t,o.x,c.x,u.x),gl(t,o.y,c.y,u.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qb extends aa{constructor(t=new G,n=new G,a=new G){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new G){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(gl(t,o.x,c.x,u.x),gl(t,o.y,c.y,u.y),gl(t,o.z,c.z,u.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zx extends aa{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Wt){const a=n,o=this.points,c=(o.length-1)*t,u=Math.floor(c),h=c-u,m=o[u===0?u:u-1],d=o[u],v=o[u>o.length-2?o.length-1:u+1],_=o[u>o.length-3?o.length-1:u+2];return a.set(m_(h,m.x,d.x,v.x,_.x),m_(h,m.y,d.y,v.y,_.y)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new Wt().fromArray(o))}return this}}var g_=Object.freeze({__proto__:null,ArcCurve:Gb,CatmullRomCurve3:Nx,CubicBezierCurve:Ox,CubicBezierCurve3:Kb,EllipseCurve:Bp,LineCurve:Px,LineCurve3:Jb,QuadraticBezierCurve:Ix,QuadraticBezierCurve3:Qb,SplineCurve:zx});class jb extends aa{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const a=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new g_[a](n,t))}return this}getPoint(t,n){const a=t*this.getLength(),o=this.getCurveLengths();let c=0;for(;c<o.length;){if(o[c]>=a){const u=o[c]-a,h=this.curves[c],m=h.getLength(),d=m===0?0:1-u/m;return h.getPointAt(d,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let a;for(let o=0,c=this.curves;o<c.length;o++){const u=c[o],h=u.isEllipseCurve?t*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?t*u.points.length:t,m=u.getPoints(h);for(let d=0;d<m.length;d++){const v=m[d];a&&a.equals(v)||(n.push(v),a=v)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(new g_[o.type]().fromJSON(o))}return this}}class v_ extends jb{constructor(t){super(),this.type="Path",this.currentPoint=new Wt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,a=t.length;n<a;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const a=new Px(this.currentPoint.clone(),new Wt(t,n));return this.curves.push(a),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,a,o){const c=new Ix(this.currentPoint.clone(),new Wt(t,n),new Wt(a,o));return this.curves.push(c),this.currentPoint.set(a,o),this}bezierCurveTo(t,n,a,o,c,u){const h=new Ox(this.currentPoint.clone(),new Wt(t,n),new Wt(a,o),new Wt(c,u));return this.curves.push(h),this.currentPoint.set(c,u),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),a=new zx(n);return this.curves.push(a),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,a,o,c,u){const h=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(t+h,n+m,a,o,c,u),this}absarc(t,n,a,o,c,u){return this.absellipse(t,n,a,a,o,c,u),this}ellipse(t,n,a,o,c,u,h,m){const d=this.currentPoint.x,v=this.currentPoint.y;return this.absellipse(t+d,n+v,a,o,c,u,h,m),this}absellipse(t,n,a,o,c,u,h,m){const d=new Bp(t,n,a,o,c,u,h,m);if(this.curves.length>0){const _=d.getPoint(0);_.equals(this.currentPoint)||this.lineTo(_.x,_.y)}this.curves.push(d);const v=d.getPoint(1);return this.currentPoint.copy(v),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Bx extends v_{constructor(t){super(t),this.uuid=Ks(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(new v_().fromJSON(o))}return this}}function $b(r,t,n=2){const a=t&&t.length,o=a?t[0]*n:r.length;let c=Fx(r,0,o,n,!0);const u=[];if(!c||c.next===c.prev)return u;let h,m,d;if(a&&(c=a1(r,t,c,n)),r.length>80*n){h=r[0],m=r[1];let v=h,_=m;for(let g=n;g<o;g+=n){const x=r[g],b=r[g+1];x<h&&(h=x),b<m&&(m=b),x>v&&(v=x),b>_&&(_=b)}d=Math.max(v-h,_-m),d=d!==0?32767/d:0}return Al(c,u,n,h,m,d,0),u}function Fx(r,t,n,a,o){let c;if(o===m1(r,t,n,a)>0)for(let u=t;u<n;u+=a)c=__(u/a|0,r[u],r[u+1],c);else for(let u=n-a;u>=t;u-=a)c=__(u/a|0,r[u],r[u+1],c);return c&&to(c,c.next)&&(Rl(c),c=c.next),c}function Ys(r,t){if(!r)return r;t||(t=r);let n=r,a;do if(a=!1,!n.steiner&&(to(n,n.next)||on(n.prev,n,n.next)===0)){if(Rl(n),n=t=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==t);return t}function Al(r,t,n,a,o,c,u){if(!r)return;!u&&c&&c1(r,a,o,c);let h=r;for(;r.prev!==r.next;){const m=r.prev,d=r.next;if(c?e1(r,a,o,c):t1(r)){t.push(m.i,r.i,d.i),Rl(r),r=d.next,h=d.next;continue}if(r=d,r===h){u?u===1?(r=n1(Ys(r),t),Al(r,t,n,a,o,c,2)):u===2&&i1(r,t,n,a,o,c):Al(Ys(r),t,n,a,o,c,1);break}}}function t1(r){const t=r.prev,n=r,a=r.next;if(on(t,n,a)>=0)return!1;const o=t.x,c=n.x,u=a.x,h=t.y,m=n.y,d=a.y,v=Math.min(o,c,u),_=Math.min(h,m,d),g=Math.max(o,c,u),x=Math.max(h,m,d);let b=a.next;for(;b!==t;){if(b.x>=v&&b.x<=g&&b.y>=_&&b.y<=x&&ul(o,h,c,m,u,d,b.x,b.y)&&on(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function e1(r,t,n,a){const o=r.prev,c=r,u=r.next;if(on(o,c,u)>=0)return!1;const h=o.x,m=c.x,d=u.x,v=o.y,_=c.y,g=u.y,x=Math.min(h,m,d),b=Math.min(v,_,g),w=Math.max(h,m,d),y=Math.max(v,_,g),S=fp(x,b,t,n,a),C=fp(w,y,t,n,a);let O=r.prevZ,A=r.nextZ;for(;O&&O.z>=S&&A&&A.z<=C;){if(O.x>=x&&O.x<=w&&O.y>=b&&O.y<=y&&O!==o&&O!==u&&ul(h,v,m,_,d,g,O.x,O.y)&&on(O.prev,O,O.next)>=0||(O=O.prevZ,A.x>=x&&A.x<=w&&A.y>=b&&A.y<=y&&A!==o&&A!==u&&ul(h,v,m,_,d,g,A.x,A.y)&&on(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;O&&O.z>=S;){if(O.x>=x&&O.x<=w&&O.y>=b&&O.y<=y&&O!==o&&O!==u&&ul(h,v,m,_,d,g,O.x,O.y)&&on(O.prev,O,O.next)>=0)return!1;O=O.prevZ}for(;A&&A.z<=C;){if(A.x>=x&&A.x<=w&&A.y>=b&&A.y<=y&&A!==o&&A!==u&&ul(h,v,m,_,d,g,A.x,A.y)&&on(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function n1(r,t){let n=r;do{const a=n.prev,o=n.next.next;!to(a,o)&&Gx(a,n,n.next,o)&&wl(a,o)&&wl(o,a)&&(t.push(a.i,n.i,o.i),Rl(n),Rl(n.next),n=r=o),n=n.next}while(n!==r);return Ys(n)}function i1(r,t,n,a,o,c){let u=r;do{let h=u.next.next;for(;h!==u.prev;){if(u.i!==h.i&&h1(u,h)){let m=Vx(u,h);u=Ys(u,u.next),m=Ys(m,m.next),Al(u,t,n,a,o,c,0),Al(m,t,n,a,o,c,0);return}h=h.next}u=u.next}while(u!==r)}function a1(r,t,n,a){const o=[];for(let c=0,u=t.length;c<u;c++){const h=t[c]*a,m=c<u-1?t[c+1]*a:r.length,d=Fx(r,h,m,a,!1);d===d.next&&(d.steiner=!0),o.push(f1(d))}o.sort(s1);for(let c=0;c<o.length;c++)n=r1(o[c],n);return n}function s1(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const a=(r.next.y-r.y)/(r.next.x-r.x),o=(t.next.y-t.y)/(t.next.x-t.x);n=a-o}return n}function r1(r,t){const n=o1(r,t);if(!n)return t;const a=Vx(n,r);return Ys(a,a.next),Ys(n,n.next)}function o1(r,t){let n=t;const a=r.x,o=r.y;let c=-1/0,u;if(to(r,n))return n;do{if(to(r,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const _=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(_<=a&&_>c&&(c=_,u=n.x<n.next.x?n:n.next,_===a))return u}n=n.next}while(n!==t);if(!u)return null;const h=u,m=u.x,d=u.y;let v=1/0;n=u;do{if(a>=n.x&&n.x>=m&&a!==n.x&&Hx(o<d?a:c,o,m,d,o<d?c:a,o,n.x,n.y)){const _=Math.abs(o-n.y)/(a-n.x);wl(n,r)&&(_<v||_===v&&(n.x>u.x||n.x===u.x&&l1(u,n)))&&(u=n,v=_)}n=n.next}while(n!==h);return u}function l1(r,t){return on(r.prev,r,t.prev)<0&&on(t.next,r,r.next)<0}function c1(r,t,n,a){let o=r;do o.z===0&&(o.z=fp(o.x,o.y,t,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==r);o.prevZ.nextZ=null,o.prevZ=null,u1(o)}function u1(r){let t,n=1;do{let a=r,o;r=null;let c=null;for(t=0;a;){t++;let u=a,h=0;for(let d=0;d<n&&(h++,u=u.nextZ,!!u);d++);let m=n;for(;h>0||m>0&&u;)h!==0&&(m===0||!u||a.z<=u.z)?(o=a,a=a.nextZ,h--):(o=u,u=u.nextZ,m--),c?c.nextZ=o:r=o,o.prevZ=c,c=o;a=u}c.nextZ=null,n*=2}while(t>1);return r}function fp(r,t,n,a,o){return r=(r-n)*o|0,t=(t-a)*o|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function f1(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function Hx(r,t,n,a,o,c,u,h){return(o-u)*(t-h)>=(r-u)*(c-h)&&(r-u)*(a-h)>=(n-u)*(t-h)&&(n-u)*(c-h)>=(o-u)*(a-h)}function ul(r,t,n,a,o,c,u,h){return!(r===u&&t===h)&&Hx(r,t,n,a,o,c,u,h)}function h1(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!d1(r,t)&&(wl(r,t)&&wl(t,r)&&p1(r,t)&&(on(r.prev,r,t.prev)||on(r,t.prev,t))||to(r,t)&&on(r.prev,r,r.next)>0&&on(t.prev,t,t.next)>0)}function on(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function to(r,t){return r.x===t.x&&r.y===t.y}function Gx(r,t,n,a){const o=cu(on(r,t,n)),c=cu(on(r,t,a)),u=cu(on(n,a,r)),h=cu(on(n,a,t));return!!(o!==c&&u!==h||o===0&&lu(r,n,t)||c===0&&lu(r,a,t)||u===0&&lu(n,r,a)||h===0&&lu(n,t,a))}function lu(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function cu(r){return r>0?1:r<0?-1:0}function d1(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&Gx(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function wl(r,t){return on(r.prev,r,r.next)<0?on(r,t,r.next)>=0&&on(r,r.prev,t)>=0:on(r,t,r.prev)<0||on(r,r.next,t)<0}function p1(r,t){let n=r,a=!1;const o=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&o<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==r);return a}function Vx(r,t){const n=hp(r.i,r.x,r.y),a=hp(t.i,t.x,t.y),o=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=o,o.prev=n,a.next=n,n.prev=a,c.next=a,a.prev=c,a}function __(r,t,n,a){const o=hp(r,t,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function Rl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function hp(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function m1(r,t,n,a){let o=0;for(let c=t,u=n-a;c<n;c+=a)o+=(r[u]-r[c])*(r[c+1]+r[u+1]),u=c;return o}class g1{static triangulate(t,n,a=2){return $b(t,n,a)}}class _l{static area(t){const n=t.length;let a=0;for(let o=n-1,c=0;c<n;o=c++)a+=t[o].x*t[c].y-t[c].x*t[o].y;return a*.5}static isClockWise(t){return _l.area(t)<0}static triangulateShape(t,n){const a=[],o=[],c=[];x_(t),S_(a,t);let u=t.length;n.forEach(x_);for(let m=0;m<n.length;m++)o.push(u),u+=n[m].length,S_(a,n[m]);const h=g1.triangulate(a,o);for(let m=0;m<h.length;m+=3)c.push(h.slice(m,m+3));return c}}function x_(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function S_(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class Hp extends zp{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,o=[-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(o,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new Hp(t.radius,t.detail)}}class ks extends dn{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const c=t/2,u=n/2,h=Math.floor(a),m=Math.floor(o),d=h+1,v=m+1,_=t/h,g=n/m,x=[],b=[],w=[],y=[];for(let S=0;S<v;S++){const C=S*g-u;for(let O=0;O<d;O++){const A=O*_-c;b.push(A,-C,0),w.push(0,0,1),y.push(O/h),y.push(1-S/m)}}for(let S=0;S<m;S++)for(let C=0;C<h;C++){const O=C+d*S,A=C+d*(S+1),U=C+1+d*(S+1),L=C+1+d*S;x.push(O,A,L),x.push(A,U,L)}this.setIndex(x),this.setAttribute("position",new Re(b,3)),this.setAttribute("normal",new Re(w,3)),this.setAttribute("uv",new Re(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ks(t.width,t.height,t.widthSegments,t.heightSegments)}}class Gp extends dn{constructor(t=new Bx([new Wt(0,.5),new Wt(-.5,-.5),new Wt(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};const a=[],o=[],c=[],u=[];let h=0,m=0;if(Array.isArray(t)===!1)d(t);else for(let v=0;v<t.length;v++)d(t[v]),this.addGroup(h,m,v),h+=m,m=0;this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(u,2));function d(v){const _=o.length/3,g=v.extractPoints(n);let x=g.shape;const b=g.holes;_l.isClockWise(x)===!1&&(x=x.reverse());for(let y=0,S=b.length;y<S;y++){const C=b[y];_l.isClockWise(C)===!0&&(b[y]=C.reverse())}const w=_l.triangulateShape(x,b);for(let y=0,S=b.length;y<S;y++){const C=b[y];x=x.concat(C)}for(let y=0,S=x.length;y<S;y++){const C=x[y];o.push(C.x,C.y,0),c.push(0,0,1),u.push(C.x,C.y)}for(let y=0,S=w.length;y<S;y++){const C=w[y],O=C[0]+_,A=C[1]+_,U=C[2]+_;a.push(O,A,U),m+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes;return v1(n,t)}static fromJSON(t,n){const a=[];for(let o=0,c=t.shapes.length;o<c;o++){const u=n[t.shapes[o]];a.push(u)}return new Gp(a,t.curveSegments)}}function v1(r,t){if(t.shapes=[],Array.isArray(r))for(let n=0,a=r.length;n<a;n++){const o=r[n];t.shapes.push(o.uuid)}else t.shapes.push(r.uuid);return t}class ms extends dn{constructor(t=1,n=32,a=16,o=0,c=Math.PI*2,u=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:o,phiLength:c,thetaStart:u,thetaLength:h},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const m=Math.min(u+h,Math.PI);let d=0;const v=[],_=new G,g=new G,x=[],b=[],w=[],y=[];for(let S=0;S<=a;S++){const C=[],O=S/a,A=u+O*h,U=t*Math.cos(A),L=Math.sqrt(t*t-U*U);let I=0;S===0&&u===0?I=.5/n:S===a&&m===Math.PI&&(I=-.5/n);for(let T=0;T<=n;T++){const P=T/n,F=o+P*c;_.x=-L*Math.cos(F),_.y=U,_.z=L*Math.sin(F),b.push(_.x,_.y,_.z),g.copy(_).normalize(),w.push(g.x,g.y,g.z),y.push(P+I,1-O),C.push(d++)}v.push(C)}for(let S=0;S<a;S++)for(let C=0;C<n;C++){const O=v[S][C+1],A=v[S][C],U=v[S+1][C],L=v[S+1][C+1];(S!==0||u>0)&&x.push(O,A,L),(S!==a-1||m<Math.PI)&&x.push(A,U,L)}this.setIndex(x),this.setAttribute("position",new Re(b,3)),this.setAttribute("normal",new Re(w,3)),this.setAttribute("uv",new Re(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ms(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function eo(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const o=r[n][a];if(y_(o))o.isRenderTargetTexture?(ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone();else if(Array.isArray(o))if(y_(o[0])){const c=[];for(let u=0,h=o.length;u<h;u++)c[u]=o[u].clone();t[n][a]=c}else t[n][a]=o.slice();else t[n][a]=o}}return t}function Xn(r){const t={};for(let n=0;n<r.length;n++){const a=eo(r[n]);for(const o in a)t[o]=a[o]}return t}function y_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function _1(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function kx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ae.workingColorSpace}const Xx={clone:eo,merge:Xn};var x1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,S1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends io{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=x1,this.fragmentShader=S1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=eo(t.uniforms),this.uniformsGroups=_1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(t).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const o=t.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new te().setHex(o.value);break;case"v2":this.uniforms[a].value=new Wt().fromArray(o.value);break;case"v3":this.uniforms[a].value=new G().fromArray(o.value);break;case"v4":this.uniforms[a].value=new an().fromArray(o.value);break;case"m3":this.uniforms[a].value=new oe().fromArray(o.value);break;case"m4":this.uniforms[a].value=new Ee().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class y1 extends ni{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ci extends io{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cp,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class M_ extends Ci{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Wt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class M1 extends io{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=FM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class b1 extends io{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Vp extends Mn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class E1 extends Vp{constructor(t,n,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const _d=new Ee,b_=new G,E_=new G;class T1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=mi,this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ip,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new an(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera;b_.setFromMatrixPosition(t.matrixWorld),n.position.copy(b_),E_.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(E_),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,a,o){_d.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix(_d,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,u=o?o.z/c.x:1,h=o?o.w/c.y:1,m=o?o.x/c.x:0,d=o?o.y/c.y:0;t.coordinateSystem===bl||t.reversedDepth?n.set(.5*u,0,0,.5*u+m,0,.5*h,0,.5*h+d,0,0,1,0,0,0,0,1):n.set(.5*u,0,0,.5*u+m,0,.5*h,0,.5*h+d,0,0,.5,.5,0,0,0,1),n.multiply(_d)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const uu=new G,fu=new ia,Ji=new G;class Wx extends Mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=ta,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(uu,fu,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uu,fu,Ji.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(uu,fu,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uu,fu,Ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const hs=new G,T_=new Wt,A_=new Wt;class Ri extends Wx{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=El*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(pl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return El*2*Math.atan(Math.tan(pl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hs.x,hs.y).multiplyScalar(-t/hs.z),hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(hs.x,hs.y).multiplyScalar(-t/hs.z)}getViewSize(t,n){return this.getViewBounds(t,T_,A_),n.subVectors(A_,T_)}setViewOffset(t,n,a,o,c,u){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(pl*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,d=u.fullHeight;c+=u.offsetX*o/m,n-=u.offsetY*a/d,o*=u.width/m,a*=u.height/d}const h=this.filmOffset;h!==0&&(c+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class kp extends Wx{constructor(t=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-t,u=a+t,h=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,u=c+d*this.view.width,h-=v*this.view.offsetY,m=h-v*this.view.height}this.projectionMatrix.makeOrthographic(c,u,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class A1 extends T1{constructor(){super(new kp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class w_ extends Vp{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.shadow=new A1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const Hr=-90,Gr=1;class w1 extends Mn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Ri(Hr,Gr,t,n);o.layers=this.layers,this.add(o);const c=new Ri(Hr,Gr,t,n);c.layers=this.layers,this.add(c);const u=new Ri(Hr,Gr,t,n);u.layers=this.layers,this.add(u);const h=new Ri(Hr,Gr,t,n);h.layers=this.layers,this.add(h);const m=new Ri(Hr,Gr,t,n);m.layers=this.layers,this.add(m);const d=new Ri(Hr,Gr,t,n);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,h,m]=n;for(const d of n)this.remove(d);if(t===ta)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===bl)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of n)this.add(d),d.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,u,h,m,d,v]=this.children,_=t.getRenderTarget(),g=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const w=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let y=!1;t.isWebGLRenderer===!0?y=t.state.buffers.depth.getReversed():y=t.reversedDepthBuffer,t.setRenderTarget(a,0,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,1,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(a,2,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(a,3,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,m),t.setRenderTarget(a,4,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),a.texture.generateMipmaps=w,t.setRenderTarget(a,5,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,v),t.setRenderTarget(_,g,x),t.xr.enabled=b,a.texture.needsPMREMUpdate=!0}}class R1 extends Ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const R_=new Ee;class C1{constructor(t,n,a=0,o=1/0){this.ray=new Pp(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new Np,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Ne("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return R_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(R_),this}intersectObject(t,n=!0,a=[]){return dp(t,this,a,n),a.sort(C_),a}intersectObjects(t,n=!0,a=[]){for(let o=0,c=t.length;o<c;o++)dp(t[o],this,a,n);return a.sort(C_),a}}function C_(r,t){return r.distance-t.distance}function dp(r,t,n,a){let o=!0;if(r.layers.test(t.layers)&&r.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,h=c.length;u<h;u++)dp(c[u],t,n,!0)}}const Qp=class Qp{constructor(t,n,a,o){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,o){const c=this.elements;return c[0]=t,c[2]=n,c[1]=a,c[3]=o,this}};Qp.prototype.isMatrix2=!0;let D_=Qp;function U_(r,t,n,a){const o=D1(a);switch(n){case Mx:return r*t;case Ep:return r*t/o.components*o.byteLength;case Tp:return r*t/o.components*o.byteLength;case qs:return r*t*2/o.components*o.byteLength;case Ap:return r*t*2/o.components*o.byteLength;case bx:return r*t*3/o.components*o.byteLength;case Hi:return r*t*4/o.components*o.byteLength;case wp:return r*t*4/o.components*o.byteLength;case mu:case gu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case vu:case _u:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Od:case Id:return Math.max(r,16)*Math.max(t,8)/4;case Nd:case Pd:return Math.max(r,8)*Math.max(t,8)/2;case zd:case Bd:case Hd:case Gd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Fd:case bu:case Vd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case kd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Xd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Wd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case qd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Yd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Zd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Kd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Jd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Qd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case jd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case $d:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case tp:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ep:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case np:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case ip:case ap:case sp:return Math.ceil(r/4)*Math.ceil(t/4)*16;case rp:case op:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Eu:case lp:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function D1(r){switch(r){case mi:case _x:return{byteLength:1,components:1};case yl:case xx:case ki:return{byteLength:2,components:1};case Mp:case bp:return{byteLength:2,components:4};case na:case yp:case Fi:return{byteLength:4,components:1};case Sx:case yx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xp}}));typeof window<"u"&&(window.__THREE__?ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function qx(){let r=null,t=!1,n=null,a=null;function o(c,u){a=r.requestAnimationFrame(o),n(c,u)}return{start:function(){t!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function U1(r){const t=new WeakMap;function n(h,m){const d=h.array,v=h.usage,_=d.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,d,v),h.onUploadCallback();let x;if(d instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)x=r.HALF_FLOAT;else if(d instanceof Uint16Array)h.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=r.SHORT;else if(d instanceof Uint32Array)x=r.UNSIGNED_INT;else if(d instanceof Int32Array)x=r.INT;else if(d instanceof Int8Array)x=r.BYTE;else if(d instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:h.version,size:_}}function a(h,m,d){const v=m.array,_=m.updateRanges;if(r.bindBuffer(d,h),_.length===0)r.bufferSubData(d,0,v);else{_.sort((x,b)=>x.start-b.start);let g=0;for(let x=1;x<_.length;x++){const b=_[g],w=_[x];w.start<=b.start+b.count+1?b.count=Math.max(b.count,w.start+w.count-b.start):(++g,_[g]=w)}_.length=g+1;for(let x=0,b=_.length;x<b;x++){const w=_[x];r.bufferSubData(d,w.start*v.BYTES_PER_ELEMENT,v,w.start,w.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=t.get(h);m&&(r.deleteBuffer(m.buffer),t.delete(h))}function u(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const v=t.get(h);(!v||v.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const d=t.get(h);if(d===void 0)t.set(h,n(h,m));else if(d.version<h.version){if(d.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(d.buffer,h,m),d.version=h.version}}return{get:o,remove:c,update:u}}var L1=`#ifdef USE_ALPHAHASH
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
#endif`,I1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,z1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,B1=`#ifdef USE_AOMAP
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
#endif`,J1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,EE=`#ifdef USE_ENVMAP
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
#endif`,IE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
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
#endif`,JE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,QE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,eT=`#ifdef USE_NORMALMAP
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
#endif`,nT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,iT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,aT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,oT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vT=`float getShadowMask() {
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
}`,_T=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xT=`#ifdef USE_SKINNING
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
#endif`,ST=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yT=`#ifdef USE_SKINNING
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
#endif`,MT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ET=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,TT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,AT=`#ifdef USE_TRANSMISSION
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
#endif`,wT=`#ifdef USE_TRANSMISSION
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
#endif`,RT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,DT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,UT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const LT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,NT=`uniform sampler2D t2D;
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
}`,OT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,PT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,IT=`varying vec3 vWorldDirection;
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
}`,FT=`#if DEPTH_PACKING == 3200
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
}`,HT=`#define DISTANCE
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
}`,GT=`#define DISTANCE
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
}`,VT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XT=`uniform float scale;
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
}`,WT=`uniform vec3 diffuse;
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
}`,qT=`#include <common>
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
}`,YT=`uniform vec3 diffuse;
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
}`,ZT=`#define LAMBERT
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
}`,KT=`#define LAMBERT
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
}`,JT=`#define MATCAP
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
}`,QT=`#define MATCAP
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
}`,jT=`#define NORMAL
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
}`,$T=`#define NORMAL
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
}`,tA=`#define PHONG
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
}`,eA=`#define PHONG
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
}`,nA=`#define STANDARD
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
}`,iA=`#define STANDARD
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
}`,aA=`#define TOON
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
}`,sA=`#define TOON
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
}`,rA=`uniform float size;
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
}`,oA=`uniform vec3 diffuse;
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
}`,lA=`#include <common>
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
}`,cA=`uniform vec3 color;
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
}`,uA=`uniform float rotation;
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
}`,fA=`uniform vec3 diffuse;
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
}`,pe={alphahash_fragment:L1,alphahash_pars_fragment:N1,alphamap_fragment:O1,alphamap_pars_fragment:P1,alphatest_fragment:I1,alphatest_pars_fragment:z1,aomap_fragment:B1,aomap_pars_fragment:F1,batching_pars_vertex:H1,batching_vertex:G1,begin_vertex:V1,beginnormal_vertex:k1,bsdfs:X1,iridescence_fragment:W1,bumpmap_pars_fragment:q1,clipping_planes_fragment:Y1,clipping_planes_pars_fragment:Z1,clipping_planes_pars_vertex:K1,clipping_planes_vertex:J1,color_fragment:Q1,color_pars_fragment:j1,color_pars_vertex:$1,color_vertex:tE,common:eE,cube_uv_reflection_fragment:nE,defaultnormal_vertex:iE,displacementmap_pars_vertex:aE,displacementmap_vertex:sE,emissivemap_fragment:rE,emissivemap_pars_fragment:oE,colorspace_fragment:lE,colorspace_pars_fragment:cE,envmap_fragment:uE,envmap_common_pars_fragment:fE,envmap_pars_fragment:hE,envmap_pars_vertex:dE,envmap_physical_pars_fragment:EE,envmap_vertex:pE,fog_vertex:mE,fog_pars_vertex:gE,fog_fragment:vE,fog_pars_fragment:_E,gradientmap_pars_fragment:xE,lightmap_pars_fragment:SE,lights_lambert_fragment:yE,lights_lambert_pars_fragment:ME,lights_pars_begin:bE,lights_toon_fragment:TE,lights_toon_pars_fragment:AE,lights_phong_fragment:wE,lights_phong_pars_fragment:RE,lights_physical_fragment:CE,lights_physical_pars_fragment:DE,lights_fragment_begin:UE,lights_fragment_maps:LE,lights_fragment_end:NE,lightprobes_pars_fragment:OE,logdepthbuf_fragment:PE,logdepthbuf_pars_fragment:IE,logdepthbuf_pars_vertex:zE,logdepthbuf_vertex:BE,map_fragment:FE,map_pars_fragment:HE,map_particle_fragment:GE,map_particle_pars_fragment:VE,metalnessmap_fragment:kE,metalnessmap_pars_fragment:XE,morphinstance_vertex:WE,morphcolor_vertex:qE,morphnormal_vertex:YE,morphtarget_pars_vertex:ZE,morphtarget_vertex:KE,normal_fragment_begin:JE,normal_fragment_maps:QE,normal_pars_fragment:jE,normal_pars_vertex:$E,normal_vertex:tT,normalmap_pars_fragment:eT,clearcoat_normal_fragment_begin:nT,clearcoat_normal_fragment_maps:iT,clearcoat_pars_fragment:aT,iridescence_pars_fragment:sT,opaque_fragment:rT,packing:oT,premultiplied_alpha_fragment:lT,project_vertex:cT,dithering_fragment:uT,dithering_pars_fragment:fT,roughnessmap_fragment:hT,roughnessmap_pars_fragment:dT,shadowmap_pars_fragment:pT,shadowmap_pars_vertex:mT,shadowmap_vertex:gT,shadowmask_pars_fragment:vT,skinbase_vertex:_T,skinning_pars_vertex:xT,skinning_vertex:ST,skinnormal_vertex:yT,specularmap_fragment:MT,specularmap_pars_fragment:bT,tonemapping_fragment:ET,tonemapping_pars_fragment:TT,transmission_fragment:AT,transmission_pars_fragment:wT,uv_pars_fragment:RT,uv_pars_vertex:CT,uv_vertex:DT,worldpos_vertex:UT,background_vert:LT,background_frag:NT,backgroundCube_vert:OT,backgroundCube_frag:PT,cube_vert:IT,cube_frag:zT,depth_vert:BT,depth_frag:FT,distance_vert:HT,distance_frag:GT,equirect_vert:VT,equirect_frag:kT,linedashed_vert:XT,linedashed_frag:WT,meshbasic_vert:qT,meshbasic_frag:YT,meshlambert_vert:ZT,meshlambert_frag:KT,meshmatcap_vert:JT,meshmatcap_frag:QT,meshnormal_vert:jT,meshnormal_frag:$T,meshphong_vert:tA,meshphong_frag:eA,meshphysical_vert:nA,meshphysical_frag:iA,meshtoon_vert:aA,meshtoon_frag:sA,points_vert:rA,points_frag:oA,shadow_vert:lA,shadow_frag:cA,sprite_vert:uA,sprite_frag:fA},Bt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new oe}},envmap:{envMap:{value:null},envMapRotation:{value:new oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new oe},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0},uvTransform:{value:new oe}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}}},$i={basic:{uniforms:Xn([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.fog]),vertexShader:pe.meshbasic_vert,fragmentShader:pe.meshbasic_frag},lambert:{uniforms:Xn([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:pe.meshlambert_vert,fragmentShader:pe.meshlambert_frag},phong:{uniforms:Xn([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pe.meshphong_vert,fragmentShader:pe.meshphong_frag},standard:{uniforms:Xn([Bt.common,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.roughnessmap,Bt.metalnessmap,Bt.fog,Bt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pe.meshphysical_vert,fragmentShader:pe.meshphysical_frag},toon:{uniforms:Xn([Bt.common,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.gradientmap,Bt.fog,Bt.lights,{emissive:{value:new te(0)}}]),vertexShader:pe.meshtoon_vert,fragmentShader:pe.meshtoon_frag},matcap:{uniforms:Xn([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,{matcap:{value:null}}]),vertexShader:pe.meshmatcap_vert,fragmentShader:pe.meshmatcap_frag},points:{uniforms:Xn([Bt.points,Bt.fog]),vertexShader:pe.points_vert,fragmentShader:pe.points_frag},dashed:{uniforms:Xn([Bt.common,Bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pe.linedashed_vert,fragmentShader:pe.linedashed_frag},depth:{uniforms:Xn([Bt.common,Bt.displacementmap]),vertexShader:pe.depth_vert,fragmentShader:pe.depth_frag},normal:{uniforms:Xn([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,{opacity:{value:1}}]),vertexShader:pe.meshnormal_vert,fragmentShader:pe.meshnormal_frag},sprite:{uniforms:Xn([Bt.sprite,Bt.fog]),vertexShader:pe.sprite_vert,fragmentShader:pe.sprite_frag},background:{uniforms:{uvTransform:{value:new oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pe.background_vert,fragmentShader:pe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new oe}},vertexShader:pe.backgroundCube_vert,fragmentShader:pe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pe.cube_vert,fragmentShader:pe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pe.equirect_vert,fragmentShader:pe.equirect_frag},distance:{uniforms:Xn([Bt.common,Bt.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pe.distance_vert,fragmentShader:pe.distance_frag},shadow:{uniforms:Xn([Bt.lights,Bt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:pe.shadow_vert,fragmentShader:pe.shadow_frag}};$i.physical={uniforms:Xn([$i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new oe},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new oe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new oe},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new oe},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new oe},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new oe},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new oe}}]),vertexShader:pe.meshphysical_vert,fragmentShader:pe.meshphysical_frag};const hu={r:0,b:0,g:0},hA=new Ee,Yx=new oe;Yx.set(-1,0,0,0,1,0,0,0,1);function dA(r,t,n,a,o,c){const u=new te(0);let h=o===!0?0:1,m,d,v=null,_=0,g=null;function x(C){let O=C.isScene===!0?C.background:null;if(O&&O.isTexture){const A=C.backgroundBlurriness>0;O=t.get(O,A)}return O}function b(C){let O=!1;const A=x(C);A===null?y(u,h):A&&A.isColor&&(y(A,1),O=!0);const U=r.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,c):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||O)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function w(C,O){const A=x(O);A&&(A.isCubeTexture||A.mapping===Uu)?(d===void 0&&(d=new Ge(new Cl(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:eo($i.backgroundCube.uniforms),vertexShader:$i.backgroundCube.vertexShader,fragmentShader:$i.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(U,L,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),d.material.uniforms.envMap.value=A,d.material.uniforms.backgroundBlurriness.value=O.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(hA.makeRotationFromEuler(O.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Yx),d.material.toneMapped=Ae.getTransfer(A.colorSpace)!==Xe,(v!==A||_!==A.version||g!==r.toneMapping)&&(d.material.needsUpdate=!0,v=A,_=A.version,g=r.toneMapping),d.layers.enableAll(),C.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new Ge(new ks(2,2),new ni({name:"BackgroundMaterial",uniforms:eo($i.background.uniforms),vertexShader:$i.background.vertexShader,fragmentShader:$i.background.fragmentShader,side:Xs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,m.material.toneMapped=Ae.getTransfer(A.colorSpace)!==Xe,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(v!==A||_!==A.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,v=A,_=A.version,g=r.toneMapping),m.layers.enableAll(),C.unshift(m,m.geometry,m.material,0,0,null))}function y(C,O){C.getRGB(hu,kx(r)),n.buffers.color.setClear(hu.r,hu.g,hu.b,O,c)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(C,O=1){u.set(C),h=O,y(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(C){h=C,y(u,h)},render:b,addToRenderList:w,dispose:S}}function pA(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=g(null);let c=o,u=!1;function h(W,H,$,k,tt){let B=!1;const X=_(W,k,$,H);c!==X&&(c=X,d(c.object)),B=x(W,k,$,tt),B&&b(W,k,$,tt),tt!==null&&t.update(tt,r.ELEMENT_ARRAY_BUFFER),(B||u)&&(u=!1,A(W,H,$,k),tt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(tt).buffer))}function m(){return r.createVertexArray()}function d(W){return r.bindVertexArray(W)}function v(W){return r.deleteVertexArray(W)}function _(W,H,$,k){const tt=k.wireframe===!0;let B=a[H.id];B===void 0&&(B={},a[H.id]=B);const X=W.isInstancedMesh===!0?W.id:0;let q=B[X];q===void 0&&(q={},B[X]=q);let nt=q[$.id];nt===void 0&&(nt={},q[$.id]=nt);let rt=nt[tt];return rt===void 0&&(rt=g(m()),nt[tt]=rt),rt}function g(W){const H=[],$=[],k=[];for(let tt=0;tt<n;tt++)H[tt]=0,$[tt]=0,k[tt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:$,attributeDivisors:k,object:W,attributes:{},index:null}}function x(W,H,$,k){const tt=c.attributes,B=H.attributes;let X=0;const q=$.getAttributes();for(const nt in q)if(q[nt].location>=0){const N=tt[nt];let et=B[nt];if(et===void 0&&(nt==="instanceMatrix"&&W.instanceMatrix&&(et=W.instanceMatrix),nt==="instanceColor"&&W.instanceColor&&(et=W.instanceColor)),N===void 0||N.attribute!==et||et&&N.data!==et.data)return!0;X++}return c.attributesNum!==X||c.index!==k}function b(W,H,$,k){const tt={},B=H.attributes;let X=0;const q=$.getAttributes();for(const nt in q)if(q[nt].location>=0){let N=B[nt];N===void 0&&(nt==="instanceMatrix"&&W.instanceMatrix&&(N=W.instanceMatrix),nt==="instanceColor"&&W.instanceColor&&(N=W.instanceColor));const et={};et.attribute=N,N&&N.data&&(et.data=N.data),tt[nt]=et,X++}c.attributes=tt,c.attributesNum=X,c.index=k}function w(){const W=c.newAttributes;for(let H=0,$=W.length;H<$;H++)W[H]=0}function y(W){S(W,0)}function S(W,H){const $=c.newAttributes,k=c.enabledAttributes,tt=c.attributeDivisors;$[W]=1,k[W]===0&&(r.enableVertexAttribArray(W),k[W]=1),tt[W]!==H&&(r.vertexAttribDivisor(W,H),tt[W]=H)}function C(){const W=c.newAttributes,H=c.enabledAttributes;for(let $=0,k=H.length;$<k;$++)H[$]!==W[$]&&(r.disableVertexAttribArray($),H[$]=0)}function O(W,H,$,k,tt,B,X){X===!0?r.vertexAttribIPointer(W,H,$,tt,B):r.vertexAttribPointer(W,H,$,k,tt,B)}function A(W,H,$,k){w();const tt=k.attributes,B=$.getAttributes(),X=H.defaultAttributeValues;for(const q in B){const nt=B[q];if(nt.location>=0){let rt=tt[q];if(rt===void 0&&(q==="instanceMatrix"&&W.instanceMatrix&&(rt=W.instanceMatrix),q==="instanceColor"&&W.instanceColor&&(rt=W.instanceColor)),rt!==void 0){const N=rt.normalized,et=rt.itemSize,Q=t.get(rt);if(Q===void 0)continue;const j=Q.buffer,bt=Q.type,wt=Q.bytesPerElement,st=bt===r.INT||bt===r.UNSIGNED_INT||rt.gpuType===yp;if(rt.isInterleavedBufferAttribute){const pt=rt.data,Tt=pt.stride,It=rt.offset;if(pt.isInstancedInterleavedBuffer){for(let At=0;At<nt.locationSize;At++)S(nt.location+At,pt.meshPerAttribute);W.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let At=0;At<nt.locationSize;At++)y(nt.location+At);r.bindBuffer(r.ARRAY_BUFFER,j);for(let At=0;At<nt.locationSize;At++)O(nt.location+At,et/nt.locationSize,bt,N,Tt*wt,(It+et/nt.locationSize*At)*wt,st)}else{if(rt.isInstancedBufferAttribute){for(let pt=0;pt<nt.locationSize;pt++)S(nt.location+pt,rt.meshPerAttribute);W.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let pt=0;pt<nt.locationSize;pt++)y(nt.location+pt);r.bindBuffer(r.ARRAY_BUFFER,j);for(let pt=0;pt<nt.locationSize;pt++)O(nt.location+pt,et/nt.locationSize,bt,N,et*wt,et/nt.locationSize*pt*wt,st)}}else if(X!==void 0){const N=X[q];if(N!==void 0)switch(N.length){case 2:r.vertexAttrib2fv(nt.location,N);break;case 3:r.vertexAttrib3fv(nt.location,N);break;case 4:r.vertexAttrib4fv(nt.location,N);break;default:r.vertexAttrib1fv(nt.location,N)}}}}C()}function U(){P();for(const W in a){const H=a[W];for(const $ in H){const k=H[$];for(const tt in k){const B=k[tt];for(const X in B)v(B[X].object),delete B[X];delete k[tt]}}delete a[W]}}function L(W){if(a[W.id]===void 0)return;const H=a[W.id];for(const $ in H){const k=H[$];for(const tt in k){const B=k[tt];for(const X in B)v(B[X].object),delete B[X];delete k[tt]}}delete a[W.id]}function I(W){for(const H in a){const $=a[H];for(const k in $){const tt=$[k];if(tt[W.id]===void 0)continue;const B=tt[W.id];for(const X in B)v(B[X].object),delete B[X];delete tt[W.id]}}}function T(W){for(const H in a){const $=a[H],k=W.isInstancedMesh===!0?W.id:0,tt=$[k];if(tt!==void 0){for(const B in tt){const X=tt[B];for(const q in X)v(X[q].object),delete X[q];delete tt[B]}delete $[k],Object.keys($).length===0&&delete a[H]}}}function P(){F(),u=!0,c!==o&&(c=o,d(c.object))}function F(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:P,resetDefaultState:F,dispose:U,releaseStatesOfGeometry:L,releaseStatesOfObject:T,releaseStatesOfProgram:I,initAttributes:w,enableAttribute:y,disableUnusedAttributes:C}}function mA(r,t,n){let a;function o(m){a=m}function c(m,d){r.drawArrays(a,m,d),n.update(d,a,1)}function u(m,d,v){v!==0&&(r.drawArraysInstanced(a,m,d,v),n.update(d,a,v))}function h(m,d,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,d,0,v);let g=0;for(let x=0;x<v;x++)g+=d[x];n.update(g,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function gA(r,t,n,a){let o;function c(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");o=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(I){return!(I!==Hi&&a.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(I){const T=I===ki&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==mi&&I!==Fi&&!T&&a.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(I){if(I==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=n.precision!==void 0?n.precision:"highp";const v=m(d);v!==d&&(ae("WebGLRenderer:",d,"not supported, using",v,"instead."),d=v);const _=n.logarithmicDepthBuffer===!0,g=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&g===!1&&ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),C=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),O=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),U=r.getParameter(r.MAX_SAMPLES),L=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:h,precision:d,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:x,maxVertexTextures:b,maxTextureSize:w,maxCubemapSize:y,maxAttributes:S,maxVertexUniforms:C,maxVaryings:O,maxFragmentUniforms:A,maxSamples:U,samples:L}}function vA(r){const t=this;let n=null,a=0,o=!1,c=!1;const u=new Ra,h=new oe,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const x=_.length!==0||g||a!==0||o;return o=g,a=_.length,x},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){n=v(_,g,0)},this.setState=function(_,g,x){const b=_.clippingPlanes,w=_.clipIntersection,y=_.clipShadows,S=r.get(_);if(!o||b===null||b.length===0||c&&!y)c?v(null):d();else{const C=c?0:a,O=C*4;let A=S.clippingState||null;m.value=A,A=v(b,g,O,x);for(let U=0;U!==O;++U)A[U]=n[U];S.clippingState=A,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=C}};function d(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function v(_,g,x,b){const w=_!==null?_.length:0;let y=null;if(w!==0){if(y=m.value,b!==!0||y===null){const S=x+w*4,C=g.matrixWorldInverse;h.getNormalMatrix(C),(y===null||y.length<S)&&(y=new Float32Array(S));for(let O=0,A=x;O!==w;++O,A+=4)u.copy(_[O]).applyMatrix4(C,h),u.normal.toArray(y,A),y[A+3]=u.constant}m.value=y,m.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,y}}const Zr=4,_A=6,xA=20,SA=256,sl=new kp,L_=new te;let xd=null,Sd=0,yd=0,Md=!1;const yA=new G,Hs=new G;class pp{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,o=100,c={}){const{size:u=256,position:h=yA}=c;xd=this._renderer.getRenderTarget(),Sd=this._renderer.getActiveCubeFace(),yd=this._renderer.getActiveMipmapLevel(),Md=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,a,o,m,h),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=P_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=O_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(xd,Sd,yd),this._renderer.xr.enabled=Md,t.scissorTest=!1,Vr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Ws||t.mapping===$r?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xd=this._renderer.getRenderTarget(),Sd=this._renderer.getActiveCubeFace(),yd=this._renderer.getActiveMipmapLevel(),Md=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:ki,format:Hi,colorSpace:Tu,depthBuffer:!1},o=N_(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=N_(t,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=MA(c)),this._blurMaterial=EA(c,t,n),this._ggxMaterial=bA(c,t,n)}return o}_compileMaterial(t){const n=new Ge(new dn,t);this._renderer.compile(n,sl)}_sceneToCubeUV(t,n,a,o,c){const m=new Ri(90,1,n,a),d=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,x=_.toneMapping;_.getClearColor(L_),_.toneMapping=ea,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ge(new Cl,new Cx({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,y=w.material;let S=!1;const C=t.background;C?C.isColor&&(y.color.copy(C),t.background=null,S=!0):(y.color.copy(L_),S=!0);for(let O=0;O<6;O++){const A=O%3;A===0?(m.up.set(0,d[O],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[O],c.y,c.z)):A===1?(m.up.set(0,0,d[O]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[O],c.z)):(m.up.set(0,d[O],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[O]));const U=this._cubeSize;Vr(o,A*U,O>2?U:0,U,U),_.setRenderTarget(o),S&&_.render(w,m),_.render(t,m)}_.toneMapping=x,_.autoClear=g,t.background=C}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===Ws||t.mapping===$r;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=P_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=O_());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const h=c.uniforms;h.envMap.value=t;const m=this._cubeSize;Vr(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(u,sl)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=a}_applyGGXFilter(t,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,h=this._lodMeshes[a];h.material=u;const m=u.uniforms,d=a/(this._lodMeshes.length-1),v=n/(this._lodMeshes.length-1),_=Math.sqrt(d*d-v*v),g=d*1.25,x=_*g,{_lodMax:b}=this,w=this._sizeLods[a],y=3*w*(a>b-Zr?a-b+Zr:0),S=4*(this._cubeSize-w);m.envMap.value=t.texture,m.roughness.value=x,m.mipInt.value=b-n,Vr(c,y,S,3*w,2*w),o.setRenderTarget(c),o.render(h,sl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=b-a,Vr(t,y,S,3*w,2*w),o.setRenderTarget(t),o.render(h,sl)}_blur(t,n,a,o){const c=this._pingPongRenderTarget,u=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(t,c,n,a,u),this._blurPass(c,t,a,a,u)}_blurPass(t,n,a,o,c){const u=this._renderer,h=this._blurMaterial,m=this._lodMeshes[o];m.material=h;const d=h.uniforms;d.envMap.value=t.texture,d.sigma.value=c,d.mipInt.value=this._lodMax-a;const v=this._sizeLods[o],_=3*v*(o>this._lodMax-Zr?o-this._lodMax+Zr:0),g=4*(this._cubeSize-v);Vr(n,_,g,3*v,2*v),u.setRenderTarget(n),u.render(m,sl)}}function MA(r){const t=[],n=[];let a=r;const o=r-Zr+1+_A;for(let c=0;c<o;c++){const u=Math.pow(2,a);t.push(u);const h=1/(u-2),m=-h,d=1+h,v=[m,m,d,m,d,d,m,m,d,d,m,d],_=6,g=6,x=3,b=new Float32Array(x*g*_),w=new Float32Array(x*g*_);for(let S=0;S<_;S++){const C=S%3*2/3-1,O=S>2?0:-1,A=[C,O,0,C+2/3,O,0,C+2/3,O+1,0,C,O,0,C+2/3,O+1,0,C,O+1,0];b.set(A,x*g*S);for(let U=0;U<g;U++){const L=v[U*2]*2-1,I=v[U*2+1]*2-1;S===0?Hs.set(1,I,L):S===1?Hs.set(-L,1,-I):S===2?Hs.set(-L,I,1):S===3?Hs.set(-1,I,-L):S===4?Hs.set(-L,-1,I):Hs.set(L,I,-1),Hs.toArray(w,(S*g+U)*x)}}const y=new dn;y.setAttribute("position",new Gi(b,x)),y.setAttribute("outputDirection",new Gi(w,x)),n.push(new Ge(y,null)),a>Zr&&a--}return{lodMeshes:n,sizeLods:t}}function N_(r,t,n){const a=new Di(r,t,n);return a.texture.mapping=Uu,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Vr(r,t,n,a,o){r.viewport.set(t,n,a,o),r.scissor.set(t,n,a,o)}function bA(r,t,n){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:SA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Lu(),fragmentShader:`

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
		`,blending:La,depthTest:!1,depthWrite:!1})}function EA(r,t,n){return new ni({name:"SphericalGaussianBlur",defines:{SAMPLES:xA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Lu(),fragmentShader:`

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
		`,blending:La,depthTest:!1,depthWrite:!1})}function O_(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lu(),fragmentShader:`

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
		`,blending:La,depthTest:!1,depthWrite:!1})}function P_(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:La,depthTest:!1,depthWrite:!1})}function Lu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Zx extends Di{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new Ux(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new Cl(5,5,5),c=new ni({name:"CubemapFromEquirect",uniforms:eo(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Wn,blending:La});c.uniforms.tEquirect.value=n;const u=new Ge(o,c),h=n.minFilter;return n.minFilter===Gs&&(n.minFilter=Fn),new w1(1,10,this).update(t,u),n.minFilter=h,u.geometry.dispose(),u.material.dispose(),this}clear(t,n=!0,a=!0,o=!0){const c=t.getRenderTarget();for(let u=0;u<6;u++)t.setRenderTarget(this,u),t.clear(n,a,o);t.setRenderTarget(c)}}function TA(r){let t=new WeakMap,n=new WeakMap,a=null;function o(g,x=!1){return g==null?null:x?u(g):c(g)}function c(g){if(g&&g.isTexture){const x=g.mapping;if(x===Wh||x===qh)if(t.has(g)){const b=t.get(g).texture;return h(b,g.mapping)}else{const b=g.image;if(b&&b.height>0){const w=new Zx(b.height);return w.fromEquirectangularTexture(r,g),t.set(g,w),g.addEventListener("dispose",d),h(w.texture,g.mapping)}else return null}}return g}function u(g){if(g&&g.isTexture){const x=g.mapping,b=x===Wh||x===qh,w=x===Ws||x===$r;if(b||w){let y=n.get(g);const S=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return a===null&&(a=new pp(r)),y=b?a.fromEquirectangular(g,y):a.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),y.texture;if(y!==void 0)return y.texture;{const C=g.image;return b&&C&&C.height>0||w&&C&&m(C)?(a===null&&(a=new pp(r)),y=b?a.fromEquirectangular(g):a.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),g.addEventListener("dispose",v),y.texture):null}}}return g}function h(g,x){return x===Wh?g.mapping=Ws:x===qh&&(g.mapping=$r),g}function m(g){let x=0;const b=6;for(let w=0;w<b;w++)g[w]!==void 0&&x++;return x===b}function d(g){const x=g.target;x.removeEventListener("dispose",d);const b=t.get(x);b!==void 0&&(t.delete(x),b.dispose())}function v(g){const x=g.target;x.removeEventListener("dispose",v);const b=n.get(x);b!==void 0&&(n.delete(x),b.dispose())}function _(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function AA(r){const t={};function n(a){if(t[a]!==void 0)return t[a];const o=r.getExtension(a);return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&Jr("WebGLRenderer: "+a+" extension not supported."),o}}}function wA(r,t,n,a){const o={},c=new WeakMap;function u(_){const g=_.target;g.index!==null&&t.remove(g.index);for(const b in g.attributes)t.remove(g.attributes[b]);g.removeEventListener("dispose",u),delete o[g.id];const x=c.get(g);x&&(t.remove(x),c.delete(g)),a.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function h(_,g){return o[g.id]===!0||(g.addEventListener("dispose",u),o[g.id]=!0,n.memory.geometries++),g}function m(_){const g=_.attributes;for(const x in g)t.update(g[x],r.ARRAY_BUFFER)}function d(_){const g=[],x=_.index,b=_.attributes.position;let w=0;if(b===void 0)return;if(x!==null){const C=x.array;w=x.version;for(let O=0,A=C.length;O<A;O+=3){const U=C[O+0],L=C[O+1],I=C[O+2];g.push(U,L,L,I,I,U)}}else{const C=b.array;w=b.version;for(let O=0,A=C.length/3-1;O<A;O+=3){const U=O+0,L=O+1,I=O+2;g.push(U,L,L,I,I,U)}}const y=new(b.count>=65535?Rx:wx)(g,1);y.version=w;const S=c.get(_);S&&t.remove(S),c.set(_,y)}function v(_){const g=c.get(_);if(g){const x=_.index;x!==null&&g.version<x.version&&d(_)}else d(_);return c.get(_)}return{get:h,update:m,getWireframeAttribute:v}}function RA(r,t,n){let a;function o(_){a=_}let c,u;function h(_){c=_.type,u=_.bytesPerElement}function m(_,g){r.drawElements(a,g,c,_*u),n.update(g,a,1)}function d(_,g,x){x!==0&&(r.drawElementsInstanced(a,g,c,_*u,x),n.update(g,a,x))}function v(_,g,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,g,0,c,_,0,x);let w=0;for(let y=0;y<x;y++)w+=g[y];n.update(w,a,1)}this.setMode=o,this.setIndex=h,this.render=m,this.renderInstances=d,this.renderMultiDraw=v}function CA(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,h){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:Ne("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function DA(r,t,n){const a=new WeakMap,o=new an;function c(u,h,m){const d=u.morphTargetInfluences,v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=v!==void 0?v.length:0;let g=a.get(h);if(g===void 0||g.count!==_){let P=function(){I.dispose(),a.delete(h),h.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const x=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,w=h.morphAttributes.color!==void 0,y=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],C=h.morphAttributes.color||[];let O=0;x===!0&&(O=1),b===!0&&(O=2),w===!0&&(O=3);let A=h.attributes.position.count*O,U=1;A>t.maxTextureSize&&(U=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const L=new Float32Array(A*U*4*_),I=new Tx(L,A,U,_);I.type=Fi,I.needsUpdate=!0;const T=O*4;for(let F=0;F<_;F++){const W=y[F],H=S[F],$=C[F],k=A*U*4*F;for(let tt=0;tt<W.count;tt++){const B=tt*T;x===!0&&(o.fromBufferAttribute(W,tt),L[k+B+0]=o.x,L[k+B+1]=o.y,L[k+B+2]=o.z,L[k+B+3]=0),b===!0&&(o.fromBufferAttribute(H,tt),L[k+B+4]=o.x,L[k+B+5]=o.y,L[k+B+6]=o.z,L[k+B+7]=0),w===!0&&(o.fromBufferAttribute($,tt),L[k+B+8]=o.x,L[k+B+9]=o.y,L[k+B+10]=o.z,L[k+B+11]=$.itemSize===4?o.w:1)}}g={count:_,texture:I,size:new Wt(A,U)},a.set(h,g),h.addEventListener("dispose",P)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let x=0;for(let w=0;w<d.length;w++)x+=d[w];const b=h.morphTargetsRelative?1:1-x;m.getUniforms().setValue(r,"morphTargetBaseInfluence",b),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function UA(r,t,n,a,o){let c=new WeakMap;function u(d){const v=o.render.frame,_=d.geometry,g=t.get(d,_);if(c.get(g)!==v&&(t.update(g),c.set(g,v)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==v&&(n.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&n.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,v))),d.isSkinnedMesh){const x=d.skeleton;c.get(x)!==v&&(x.update(),c.set(x,v))}return g}function h(){c=new WeakMap}function m(d){const v=d.target;v.removeEventListener("dispose",m),a.releaseStatesOfObject(v),n.remove(v.instanceMatrix),v.instanceColor!==null&&n.remove(v.instanceColor)}return{update:u,dispose:h}}const LA={[fx]:"LINEAR_TONE_MAPPING",[hx]:"REINHARD_TONE_MAPPING",[dx]:"CINEON_TONE_MAPPING",[Sp]:"ACES_FILMIC_TONE_MAPPING",[mx]:"AGX_TONE_MAPPING",[gx]:"NEUTRAL_TONE_MAPPING",[px]:"CUSTOM_TONE_MAPPING"};function NA(r,t,n,a,o,c){const u=new Di(t,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,m=null;const d=new dn;d.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Re([0,2,0,0,2,0],2));const v=new y1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new Ge(d,v),g=new kp(-1,1,1,-1,0,1);let x=null,b=null,w=!1,y,S=null,C=[],O=!1;this.setSize=function(A,U){u.setSize(A,U),h!==null&&h.setSize(A,U),m!==null&&m.setSize(A,U);for(let L=0;L<C.length;L++){const I=C[L];I.setSize&&I.setSize(A,U)}},this.setEffects=function(A){C=A,O=C.length>0&&C[0].isRenderPass===!0;const U=u.width,L=u.height;C.length>0&&h===null&&(h=new Di(U,L,{type:ki,depthBuffer:!1,stencilBuffer:!1}),m=new Di(U,L,{type:ki,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<C.length;I++){const T=C[I];T.setSize&&T.setSize(U,L)}},this.begin=function(A,U){if(w||A.toneMapping===ea&&C.length===0)return!1;if(S=U,U!==null){const L=U.width,I=U.height;(u.width!==L||u.height!==I)&&this.setSize(L,I)}return O===!1&&A.setRenderTarget(u),y=A.toneMapping,A.toneMapping=ea,!0},this.hasRenderPass=function(){return O},this.end=function(A,U){A.toneMapping=y,w=!0;let L=u,I=h;for(let T=0;T<C.length;T++){const P=C[T];P.enabled!==!1&&(P.render(A,I,L,U),P.needsSwap!==!1&&(L=I,I=I===h?m:h))}if(x!==A.outputColorSpace||b!==A.toneMapping){x=A.outputColorSpace,b=A.toneMapping,v.defines={},Ae.getTransfer(x)===Xe&&(v.defines.SRGB_TRANSFER="");const T=LA[b];T&&(v.defines[T]=""),v.needsUpdate=!0}v.uniforms.tDiffuse.value=L.texture,A.setRenderTarget(S),A.render(_,g),S=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){u.dispose(),h!==null&&h.dispose(),m!==null&&m.dispose(),d.dispose(),v.dispose()}}const Kx=new Pn,mp=new Tl(1,1),Jx=new Tx,Qx=new Sb,jx=new Ux,I_=[],z_=[],B_=new Float32Array(16),F_=new Float32Array(9),H_=new Float32Array(4);function ao(r,t,n){const a=r[0];if(a<=0||a>0)return r;const o=t*n;let c=I_[o];if(c===void 0&&(c=new Float32Array(o),I_[o]=c),t!==0){a.toArray(c,0);for(let u=1,h=0;u!==t;++u)h+=n,r[u].toArray(c,h)}return c}function Tn(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function An(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Nu(r,t){let n=z_[t];n===void 0&&(n=new Int32Array(t),z_[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function OA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function PA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tn(n,t))return;r.uniform2fv(this.addr,t),An(n,t)}}function IA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Tn(n,t))return;r.uniform3fv(this.addr,t),An(n,t)}}function zA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tn(n,t))return;r.uniform4fv(this.addr,t),An(n,t)}}function BA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Tn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),An(n,t)}else{if(Tn(n,a))return;H_.set(a),r.uniformMatrix2fv(this.addr,!1,H_),An(n,a)}}function FA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Tn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),An(n,t)}else{if(Tn(n,a))return;F_.set(a),r.uniformMatrix3fv(this.addr,!1,F_),An(n,a)}}function HA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Tn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),An(n,t)}else{if(Tn(n,a))return;B_.set(a),r.uniformMatrix4fv(this.addr,!1,B_),An(n,a)}}function GA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function VA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tn(n,t))return;r.uniform2iv(this.addr,t),An(n,t)}}function kA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Tn(n,t))return;r.uniform3iv(this.addr,t),An(n,t)}}function XA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tn(n,t))return;r.uniform4iv(this.addr,t),An(n,t)}}function WA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function qA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tn(n,t))return;r.uniform2uiv(this.addr,t),An(n,t)}}function YA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Tn(n,t))return;r.uniform3uiv(this.addr,t),An(n,t)}}function ZA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tn(n,t))return;r.uniform4uiv(this.addr,t),An(n,t)}}function KA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(mp.compareFunction=n.isReversedDepthBuffer()?Cp:Rp,c=mp):c=Kx,n.setTexture2D(t||c,o)}function JA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||Qx,o)}function QA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||jx,o)}function jA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||Jx,o)}function $A(r){switch(r){case 5126:return OA;case 35664:return PA;case 35665:return IA;case 35666:return zA;case 35674:return BA;case 35675:return FA;case 35676:return HA;case 5124:case 35670:return GA;case 35667:case 35671:return VA;case 35668:case 35672:return kA;case 35669:case 35673:return XA;case 5125:return WA;case 36294:return qA;case 36295:return YA;case 36296:return ZA;case 35678:case 36198:case 36298:case 36306:case 35682:return KA;case 35679:case 36299:case 36307:return JA;case 35680:case 36300:case 36308:case 36293:return QA;case 36289:case 36303:case 36311:case 36292:return jA}}function tw(r,t){r.uniform1fv(this.addr,t)}function ew(r,t){const n=ao(t,this.size,2);r.uniform2fv(this.addr,n)}function nw(r,t){const n=ao(t,this.size,3);r.uniform3fv(this.addr,n)}function iw(r,t){const n=ao(t,this.size,4);r.uniform4fv(this.addr,n)}function aw(r,t){const n=ao(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function sw(r,t){const n=ao(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function rw(r,t){const n=ao(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function ow(r,t){r.uniform1iv(this.addr,t)}function lw(r,t){r.uniform2iv(this.addr,t)}function cw(r,t){r.uniform3iv(this.addr,t)}function uw(r,t){r.uniform4iv(this.addr,t)}function fw(r,t){r.uniform1uiv(this.addr,t)}function hw(r,t){r.uniform2uiv(this.addr,t)}function dw(r,t){r.uniform3uiv(this.addr,t)}function pw(r,t){r.uniform4uiv(this.addr,t)}function mw(r,t,n){const a=this.cache,o=t.length,c=Nu(n,o);Tn(a,c)||(r.uniform1iv(this.addr,c),An(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=mp:u=Kx;for(let h=0;h!==o;++h)n.setTexture2D(t[h]||u,c[h])}function gw(r,t,n){const a=this.cache,o=t.length,c=Nu(n,o);Tn(a,c)||(r.uniform1iv(this.addr,c),An(a,c));for(let u=0;u!==o;++u)n.setTexture3D(t[u]||Qx,c[u])}function vw(r,t,n){const a=this.cache,o=t.length,c=Nu(n,o);Tn(a,c)||(r.uniform1iv(this.addr,c),An(a,c));for(let u=0;u!==o;++u)n.setTextureCube(t[u]||jx,c[u])}function _w(r,t,n){const a=this.cache,o=t.length,c=Nu(n,o);Tn(a,c)||(r.uniform1iv(this.addr,c),An(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(t[u]||Jx,c[u])}function xw(r){switch(r){case 5126:return tw;case 35664:return ew;case 35665:return nw;case 35666:return iw;case 35674:return aw;case 35675:return sw;case 35676:return rw;case 5124:case 35670:return ow;case 35667:case 35671:return lw;case 35668:case 35672:return cw;case 35669:case 35673:return uw;case 5125:return fw;case 36294:return hw;case 36295:return dw;case 36296:return pw;case 35678:case 36198:case 36298:case 36306:case 35682:return mw;case 35679:case 36299:case 36307:return gw;case 35680:case 36300:case 36308:case 36293:return vw;case 36289:case 36303:case 36311:case 36292:return _w}}class Sw{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=$A(n.type)}}class yw{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=xw(n.type)}}class Mw{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const h=o[c];h.setValue(t,n[h.id],a)}}}const bd=/(\w+)(\])?(\[|\.)?/g;function G_(r,t){r.seq.push(t),r.map[t.id]=t}function bw(r,t,n){const a=r.name,o=a.length;for(bd.lastIndex=0;;){const c=bd.exec(a),u=bd.lastIndex;let h=c[1];const m=c[2]==="]",d=c[3];if(m&&(h=h|0),d===void 0||d==="["&&u+2===o){G_(n,d===void 0?new Sw(h,r,t):new yw(h,r,t));break}else{let _=n.map[h];_===void 0&&(_=new Mw(h),G_(n,_)),n=_}}}class xu{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const h=t.getActiveUniform(n,u),m=t.getUniformLocation(n,h.name);bw(h,m,this)}const o=[],c=[];for(const u of this.seq)u.type===t.SAMPLER_2D_SHADOW||u.type===t.SAMPLER_CUBE_SHADOW||u.type===t.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(t,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let c=0,u=n.length;c!==u;++c){const h=n[c],m=a[h.id];m.needsUpdate!==!1&&h.setValue(t,m.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,c=t.length;o!==c;++o){const u=t[o];u.id in n&&a.push(u)}return a}}function V_(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const Ew=37297;let Tw=0;function Aw(r,t){const n=r.split(`
`),a=[],o=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let u=o;u<c;u++){const h=u+1;a.push(`${h===t?">":" "} ${h}: ${n[u]}`)}return a.join(`
`)}const k_=new oe;function ww(r){Ae._getMatrix(k_,Ae.workingColorSpace,r);const t=`mat3( ${k_.elements.map(n=>n.toFixed(4))} )`;switch(Ae.getTransfer(r)){case Au:return[t,"LinearTransferOETF"];case Xe:return[t,"sRGBTransferOETF"];default:return ae("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function X_(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const h=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+Aw(r.getShaderSource(t),h)}else return c}function Rw(r,t){const n=ww(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Cw={[fx]:"Linear",[hx]:"Reinhard",[dx]:"Cineon",[Sp]:"ACESFilmic",[mx]:"AgX",[gx]:"Neutral",[px]:"Custom"};function Dw(r,t){const n=Cw[t];return n===void 0?(ae("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const du=new G;function Uw(){Ae.getLuminanceCoefficients(du);const r=du.x.toFixed(4),t=du.y.toFixed(4),n=du.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lw(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fl).join(`
`)}function Nw(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function Ow(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(t,o),u=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[u]={type:c.type,location:r.getAttribLocation(t,u),locationSize:h}}return n}function fl(r){return r!==""}function W_(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function q_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Pw=/^[ \t]*#include +<([\w\d./]+)>/gm;function gp(r){return r.replace(Pw,zw)}const Iw=new Map;function zw(r,t){let n=pe[t];if(n===void 0){const a=Iw.get(t);if(a!==void 0)n=pe[a],ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return gp(n)}const Bw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Y_(r){return r.replace(Bw,Fw)}function Fw(r,t,n,a){let o="";for(let c=parseInt(t);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function Z_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const Hw={[pu]:"SHADOWMAP_TYPE_PCF",[cl]:"SHADOWMAP_TYPE_VSM"};function Gw(r){return Hw[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Vw={[Ws]:"ENVMAP_TYPE_CUBE",[$r]:"ENVMAP_TYPE_CUBE",[Uu]:"ENVMAP_TYPE_CUBE_UV"};function kw(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Vw[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Xw={[$r]:"ENVMAP_MODE_REFRACTION"};function Ww(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Xw[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const qw={[ux]:"ENVMAP_BLENDING_MULTIPLY",[IM]:"ENVMAP_BLENDING_MIX",[zM]:"ENVMAP_BLENDING_ADD"};function Yw(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":qw[r.combine]||"ENVMAP_BLENDING_NONE"}function Zw(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function Kw(r,t,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,h=n.fragmentShader;const m=Gw(n),d=kw(n),v=Ww(n),_=Yw(n),g=Zw(n),x=Lw(n),b=Nw(c),w=o.createProgram();let y,S,C=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(fl).join(`
`),y.length>0&&(y+=`
`),S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(fl).join(`
`),S.length>0&&(S+=`
`)):(y=[Z_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fl).join(`
`),S=[Z_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.envMap?"#define "+v:"",n.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ea?"#define TONE_MAPPING":"",n.toneMapping!==ea?pe.tonemapping_pars_fragment:"",n.toneMapping!==ea?Dw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",pe.colorspace_pars_fragment,Rw("linearToOutputTexel",n.outputColorSpace),Uw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(fl).join(`
`)),u=gp(u),u=W_(u,n),u=q_(u,n),h=gp(h),h=W_(h,n),h=q_(h,n),u=Y_(u),h=Y_(h),n.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,y=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,S=["#define varying in",n.glslVersion===kv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===kv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const O=C+y+u,A=C+S+h,U=V_(o,o.VERTEX_SHADER,O),L=V_(o,o.FRAGMENT_SHADER,A);o.attachShader(w,U),o.attachShader(w,L),n.index0AttributeName!==void 0?o.bindAttribLocation(w,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(w,0,"position"),o.linkProgram(w);function I(W){if(r.debug.checkShaderErrors){const H=o.getProgramInfoLog(w)||"",$=o.getShaderInfoLog(U)||"",k=o.getShaderInfoLog(L)||"",tt=H.trim(),B=$.trim(),X=k.trim();let q=!0,nt=!0;if(o.getProgramParameter(w,o.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,w,U,L);else{const rt=X_(o,U,"vertex"),N=X_(o,L,"fragment");Ne("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(w,o.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+tt+`
`+rt+`
`+N)}else tt!==""?ae("WebGLProgram: Program Info Log:",tt):(B===""||X==="")&&(nt=!1);nt&&(W.diagnostics={runnable:q,programLog:tt,vertexShader:{log:B,prefix:y},fragmentShader:{log:X,prefix:S}})}o.deleteShader(U),o.deleteShader(L),T=new xu(o,w),P=Ow(o,w)}let T;this.getUniforms=function(){return T===void 0&&I(this),T};let P;this.getAttributes=function(){return P===void 0&&I(this),P};let F=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=o.getProgramParameter(w,Ew)),F},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Tw++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=U,this.fragmentShader=L,this}let Jw=0;class Qw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new jw(t),n.set(t,a)),a}}class jw{constructor(t){this.id=Jw++,this.code=t,this.usedTimes=0}}function $w(r){return r===qs||r===bu||r===Eu}function t2(r,t,n,a,o,c){const u=new Np,h=new Qw,m=new Set,d=[],v=new Map,_=a.logarithmicDepthBuffer;let g=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(T){return m.add(T),T===0?"uv":`uv${T}`}function w(T,P,F,W,H,$){const k=W.fog,tt=H.geometry,B=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?W.environment:null,X=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,q=t.get(T.envMap||B,X),nt=q&&q.mapping===Uu?q.image.height:null,rt=x[T.type];T.precision!==null&&(g=a.getMaxPrecision(T.precision),g!==T.precision&&ae("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const N=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,et=N!==void 0?N.length:0;let Q=0;tt.morphAttributes.position!==void 0&&(Q=1),tt.morphAttributes.normal!==void 0&&(Q=2),tt.morphAttributes.color!==void 0&&(Q=3);let j,bt,wt,st;if(rt){const We=$i[rt];j=We.vertexShader,bt=We.fragmentShader}else{j=T.vertexShader,bt=T.fragmentShader;const We=h.getVertexShaderStage(T),Ue=h.getFragmentShaderStage(T);h.update(T,We,Ue),wt=We.id,st=Ue.id}const pt=r.getRenderTarget(),Tt=r.state.buffers.depth.getReversed(),It=H.isInstancedMesh===!0,At=H.isBatchedMesh===!0,ee=!!T.map,Be=!!T.matcap,ne=!!q,me=!!T.aoMap,Ce=!!T.lightMap,ue=!!T.bumpMap&&T.wireframe===!1,we=!!T.normalMap,je=!!T.displacementMap,ln=!!T.emissiveMap,Oe=!!T.metalnessMap,$e=!!T.roughnessMap,K=T.anisotropy>0,De=T.clearcoat>0,_e=T.dispersion>0,z=T.retroreflectivity>0,E=T.iridescence>0,it=T.sheen>0,ot=T.transmission>0,vt=K&&!!T.anisotropyMap,Rt=De&&!!T.clearcoatMap,Ut=De&&!!T.clearcoatNormalMap,gt=De&&!!T.clearcoatRoughnessMap,_t=E&&!!T.iridescenceMap,Ct=E&&!!T.iridescenceThicknessMap,Vt=it&&!!T.sheenColorMap,Pt=it&&!!T.sheenRoughnessMap,Nt=!!T.specularMap,Qt=!!T.specularColorMap,jt=!!T.specularIntensityMap,se=ot&&!!T.transmissionMap,J=ot&&!!T.thicknessMap,Dt=!!T.gradientMap,St=!!T.alphaMap,Lt=T.alphaTest>0,Ft=!!T.alphaHash,Et=!!T.extensions;let Jt=ea;T.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(Jt=r.toneMapping);const qt={shaderID:rt,shaderType:T.type,shaderName:T.name,vertexShader:j,fragmentShader:bt,defines:T.defines,customVertexShaderID:wt,customFragmentShaderID:st,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:At,batchingColor:At&&H._colorsTexture!==null,instancing:It,instancingColor:It&&H.instanceColor!==null,instancingMorph:It&&H.morphTexture!==null,outputColorSpace:pt===null?r.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:Ae.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:ee,matcap:Be,envMap:ne,envMapMode:ne&&q.mapping,envMapCubeUVHeight:nt,aoMap:me,lightMap:Ce,bumpMap:ue,normalMap:we,displacementMap:je,emissiveMap:ln,normalMapObjectSpace:we&&T.normalMapType===HM,normalMapTangentSpace:we&&T.normalMapType===cp,packedNormalMap:we&&T.normalMapType===cp&&$w(T.normalMap.format),metalnessMap:Oe,roughnessMap:$e,anisotropy:K,anisotropyMap:vt,clearcoat:De,clearcoatMap:Rt,clearcoatNormalMap:Ut,clearcoatRoughnessMap:gt,dispersion:_e,retroreflection:z,iridescence:E,iridescenceMap:_t,iridescenceThicknessMap:Ct,sheen:it,sheenColorMap:Vt,sheenRoughnessMap:Pt,specularMap:Nt,specularColorMap:Qt,specularIntensityMap:jt,transmission:ot,transmissionMap:se,thicknessMap:J,gradientMap:Dt,opaque:T.transparent===!1&&T.blending===dl&&T.alphaToCoverage===!1,alphaMap:St,alphaTest:Lt,alphaHash:Ft,combine:T.combine,mapUv:ee&&b(T.map.channel),aoMapUv:me&&b(T.aoMap.channel),lightMapUv:Ce&&b(T.lightMap.channel),bumpMapUv:ue&&b(T.bumpMap.channel),normalMapUv:we&&b(T.normalMap.channel),displacementMapUv:je&&b(T.displacementMap.channel),emissiveMapUv:ln&&b(T.emissiveMap.channel),metalnessMapUv:Oe&&b(T.metalnessMap.channel),roughnessMapUv:$e&&b(T.roughnessMap.channel),anisotropyMapUv:vt&&b(T.anisotropyMap.channel),clearcoatMapUv:Rt&&b(T.clearcoatMap.channel),clearcoatNormalMapUv:Ut&&b(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&b(T.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&b(T.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&b(T.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&b(T.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&b(T.sheenRoughnessMap.channel),specularMapUv:Nt&&b(T.specularMap.channel),specularColorMapUv:Qt&&b(T.specularColorMap.channel),specularIntensityMapUv:jt&&b(T.specularIntensityMap.channel),transmissionMapUv:se&&b(T.transmissionMap.channel),thicknessMapUv:J&&b(T.thicknessMap.channel),alphaMapUv:St&&b(T.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(we||K),vertexNormals:!!tt.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!tt.attributes.uv&&(ee||St),fog:!!k,useFog:T.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||tt.attributes.normal===void 0&&we===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Tt,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:tt.attributes.position!==void 0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:Q,numSunLights:P.sun.length,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numSunLightShadows:P.sunShadowMap.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Jt,decodeVideoTexture:ee&&T.map.isVideoTexture===!0&&Ae.getTransfer(T.map.colorSpace)===Xe,decodeVideoTextureEmissive:ln&&T.emissiveMap.isVideoTexture===!0&&Ae.getTransfer(T.emissiveMap.colorSpace)===Xe,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===ei,flipSided:T.side===Wn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Et&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&T.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return qt.vertexUv1s=m.has(1),qt.vertexUv2s=m.has(2),qt.vertexUv3s=m.has(3),m.clear(),qt}function y(T){const P=[];if(T.shaderID?P.push(T.shaderID):(P.push(T.customVertexShaderID),P.push(T.customFragmentShaderID)),T.defines!==void 0)for(const F in T.defines)P.push(F),P.push(T.defines[F]);return T.isRawShaderMaterial===!1&&(S(P,T),C(P,T),P.push(r.outputColorSpace)),P.push(T.customProgramCacheKey),P.join()}function S(T,P){T.push(P.precision),T.push(P.outputColorSpace),T.push(P.envMapMode),T.push(P.envMapCubeUVHeight),T.push(P.mapUv),T.push(P.alphaMapUv),T.push(P.lightMapUv),T.push(P.aoMapUv),T.push(P.bumpMapUv),T.push(P.normalMapUv),T.push(P.displacementMapUv),T.push(P.emissiveMapUv),T.push(P.metalnessMapUv),T.push(P.roughnessMapUv),T.push(P.anisotropyMapUv),T.push(P.clearcoatMapUv),T.push(P.clearcoatNormalMapUv),T.push(P.clearcoatRoughnessMapUv),T.push(P.iridescenceMapUv),T.push(P.iridescenceThicknessMapUv),T.push(P.sheenColorMapUv),T.push(P.sheenRoughnessMapUv),T.push(P.specularMapUv),T.push(P.specularColorMapUv),T.push(P.specularIntensityMapUv),T.push(P.transmissionMapUv),T.push(P.thicknessMapUv),T.push(P.combine),T.push(P.fogExp2),T.push(P.sizeAttenuation),T.push(P.morphTargetsCount),T.push(P.morphAttributeCount),T.push(P.numSunLights),T.push(P.numDirLights),T.push(P.numPointLights),T.push(P.numSpotLights),T.push(P.numSpotLightMaps),T.push(P.numHemiLights),T.push(P.numRectAreaLights),T.push(P.numSunLightShadows),T.push(P.numDirLightShadows),T.push(P.numPointLightShadows),T.push(P.numSpotLightShadows),T.push(P.numSpotLightShadowsWithMaps),T.push(P.numLightProbes),T.push(P.shadowMapType),T.push(P.toneMapping),T.push(P.numClippingPlanes),T.push(P.numClipIntersection),T.push(P.depthPacking)}function C(T,P){u.disableAll(),P.instancing&&u.enable(0),P.instancingColor&&u.enable(1),P.instancingMorph&&u.enable(2),P.matcap&&u.enable(3),P.envMap&&u.enable(4),P.normalMapObjectSpace&&u.enable(5),P.normalMapTangentSpace&&u.enable(6),P.clearcoat&&u.enable(7),P.iridescence&&u.enable(8),P.alphaTest&&u.enable(9),P.vertexColors&&u.enable(10),P.vertexAlphas&&u.enable(11),P.vertexUv1s&&u.enable(12),P.vertexUv2s&&u.enable(13),P.vertexUv3s&&u.enable(14),P.vertexTangents&&u.enable(15),P.anisotropy&&u.enable(16),P.alphaHash&&u.enable(17),P.batching&&u.enable(18),P.dispersion&&u.enable(19),P.retroreflection&&u.enable(24),P.batchingColor&&u.enable(20),P.gradientMap&&u.enable(21),P.packedNormalMap&&u.enable(22),P.vertexNormals&&u.enable(23),T.push(u.mask),u.disableAll(),P.fog&&u.enable(0),P.useFog&&u.enable(1),P.flatShading&&u.enable(2),P.logarithmicDepthBuffer&&u.enable(3),P.reversedDepthBuffer&&u.enable(4),P.skinning&&u.enable(5),P.morphTargets&&u.enable(6),P.morphNormals&&u.enable(7),P.morphColors&&u.enable(8),P.premultipliedAlpha&&u.enable(9),P.shadowMapEnabled&&u.enable(10),P.doubleSided&&u.enable(11),P.flipSided&&u.enable(12),P.useDepthPacking&&u.enable(13),P.dithering&&u.enable(14),P.transmission&&u.enable(15),P.sheen&&u.enable(16),P.opaque&&u.enable(17),P.pointsUvs&&u.enable(18),P.decodeVideoTexture&&u.enable(19),P.decodeVideoTextureEmissive&&u.enable(20),P.alphaToCoverage&&u.enable(21),P.numLightProbeGrids>0&&u.enable(22),P.hasPositionAttribute&&u.enable(23),T.push(u.mask)}function O(T){const P=x[T.type];let F;if(P){const W=$i[P];F=Xx.clone(W.uniforms)}else F=T.uniforms;return F}function A(T,P){let F=v.get(P);return F!==void 0?++F.usedTimes:(F=new Kw(r,P,T,o),d.push(F),v.set(P,F)),F}function U(T){if(--T.usedTimes===0){const P=d.indexOf(T);d[P]=d[d.length-1],d.pop(),v.delete(T.cacheKey),T.destroy()}}function L(T){h.remove(T)}function I(){h.dispose()}return{getParameters:w,getProgramCacheKey:y,getUniforms:O,acquireProgram:A,releaseProgram:U,releaseShaderCache:L,programs:d,dispose:I}}function e2(){let r=new WeakMap;function t(u){return r.has(u)}function n(u){let h=r.get(u);return h===void 0&&(h={},r.set(u,h)),h}function a(u){r.delete(u)}function o(u,h,m){r.get(u)[h]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:c}}function n2(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function K_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function J_(){const r=[];let t=0;const n=[],a=[],o=[];function c(){t=0,n.length=0,a.length=0,o.length=0}function u(g){let x=0;return g.isInstancedMesh&&(x+=2),g.isSkinnedMesh&&(x+=1),x}function h(g,x,b,w,y,S){let C=r[t];return C===void 0?(C={id:g.id,object:g,geometry:x,material:b,materialVariant:u(g),groupOrder:w,renderOrder:g.renderOrder,z:y,group:S},r[t]=C):(C.id=g.id,C.object=g,C.geometry=x,C.material=b,C.materialVariant=u(g),C.groupOrder=w,C.renderOrder=g.renderOrder,C.z=y,C.group=S),t++,C}function m(g,x,b,w,y,S,C){C.reversedDepth===!0&&(y=-y);const O=h(g,x,b,w,y,S);b.transmission>0?a.push(O):b.transparent===!0?o.push(O):n.push(O)}function d(g,x,b,w,y,S){const C=h(g,x,b,w,y,S);b.transmission>0?a.unshift(C):b.transparent===!0?o.unshift(C):n.unshift(C)}function v(g,x){n.length>1&&n.sort(g||n2),a.length>1&&a.sort(x||K_),o.length>1&&o.sort(x||K_)}function _(){for(let g=t,x=r.length;g<x;g++){const b=r[g];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:m,unshift:d,finish:_,sort:v}}function i2(){let r=new WeakMap;function t(a,o){const c=r.get(a);let u;return c===void 0?(u=new J_,r.set(a,[u])):o>=c.length?(u=new J_,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:t,dispose:n}}function a2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new G,color:new te};break;case"SpotLight":n={position:new G,direction:new G,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new G,color:new te,distance:0,decay:0};break;case"HemisphereLight":n={direction:new G,skyColor:new te,groundColor:new te};break;case"RectAreaLight":n={color:new te,position:new G,halfWidth:new G,halfHeight:new G};break}return r[t.id]=n,n}}}function s2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let r2=0;function o2(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function l2(r){const t=new a2,n=s2(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)a.probe.push(new G);const o=new G,c=new Ee,u=new Ee;function h(d){let v=0,_=0,g=0;for(let H=0;H<9;H++)a.probe[H].set(0,0,0);let x=0,b=0,w=0,y=0,S=0,C=0,O=0,A=0,U=0,L=0,I=0,T=0,P=0,F=0;d.sort(o2);for(let H=0,$=d.length;H<$;H++){const k=d[H],tt=k.color,B=k.intensity,X=k.distance;let q=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===qs?q=k.shadow.map.texture:q=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)v+=tt.r*B,_+=tt.g*B,g+=tt.b*B;else if(k.isLightProbe){for(let nt=0;nt<9;nt++)a.probe[nt].addScaledVector(k.sh.coefficients[nt],B);F++}else if(k.isSunLight){const nt=t.get(k);if(nt.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const rt=k.shadow,N=n.get(k);N.shadowIntensity=rt.intensity,N.shadowBias=rt.bias,N.shadowNormalBias=rt.normalBias,N.shadowRadius=rt.radius,N.shadowMapSize.copy(rt.mapSize).multiply(rt.getFrameExtents()),a.sunShadow[b]=N,a.sunShadowMap[b]=q;const et=rt.getViewportCount();for(let Q=0;Q<et;Q++)a.sunShadowMatrix[w+Q]=rt.getMatrix(Q),a.sunShadowCascade[w+Q]=rt._cascadeData[Q];w+=et,b++}a.sun[x]=nt,x++}else if(k.isDirectionalLight){const nt=t.get(k);if(nt.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const rt=k.shadow,N=n.get(k);N.shadowIntensity=rt.intensity,N.shadowBias=rt.bias,N.shadowNormalBias=rt.normalBias,N.shadowRadius=rt.radius,N.shadowMapSize=rt.mapSize,a.directionalShadow[y]=N,a.directionalShadowMap[y]=q,a.directionalShadowMatrix[y]=k.shadow.matrix,U++}a.directional[y]=nt,y++}else if(k.isSpotLight){const nt=t.get(k);nt.position.setFromMatrixPosition(k.matrixWorld),nt.color.copy(tt).multiplyScalar(B),nt.distance=X,nt.coneCos=Math.cos(k.angle),nt.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),nt.decay=k.decay,a.spot[C]=nt;const rt=k.shadow;if(k.map&&(a.spotLightMap[T]=k.map,T++,rt.updateMatrices(k),k.castShadow&&P++),a.spotLightMatrix[C]=rt.matrix,k.castShadow){const N=n.get(k);N.shadowIntensity=rt.intensity,N.shadowBias=rt.bias,N.shadowNormalBias=rt.normalBias,N.shadowRadius=rt.radius,N.shadowMapSize=rt.mapSize,a.spotShadow[C]=N,a.spotShadowMap[C]=q,I++}C++}else if(k.isRectAreaLight){const nt=t.get(k);nt.color.copy(tt).multiplyScalar(B),nt.halfWidth.set(k.width*.5,0,0),nt.halfHeight.set(0,k.height*.5,0),a.rectArea[O]=nt,O++}else if(k.isPointLight){const nt=t.get(k);if(nt.color.copy(k.color).multiplyScalar(k.intensity),nt.distance=k.distance,nt.decay=k.decay,k.castShadow){const rt=k.shadow,N=n.get(k);N.shadowIntensity=rt.intensity,N.shadowBias=rt.bias,N.shadowNormalBias=rt.normalBias,N.shadowRadius=rt.radius,N.shadowMapSize=rt.mapSize,N.shadowCameraNear=rt.camera.near,N.shadowCameraFar=rt.camera.far,a.pointShadow[S]=N,a.pointShadowMap[S]=q,a.pointShadowMatrix[S]=k.shadow.matrix,L++}a.point[S]=nt,S++}else if(k.isHemisphereLight){const nt=t.get(k);nt.skyColor.copy(k.color).multiplyScalar(B),nt.groundColor.copy(k.groundColor).multiplyScalar(B),a.hemi[A]=nt,A++}}O>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Bt.LTC_FLOAT_1,a.rectAreaLTC2=Bt.LTC_FLOAT_2):(a.rectAreaLTC1=Bt.LTC_HALF_1,a.rectAreaLTC2=Bt.LTC_HALF_2)),a.ambient[0]=v,a.ambient[1]=_,a.ambient[2]=g;const W=a.hash;(W.sunLength!==x||W.directionalLength!==y||W.pointLength!==S||W.spotLength!==C||W.rectAreaLength!==O||W.hemiLength!==A||W.numSunShadows!==b||W.numDirectionalShadows!==U||W.numPointShadows!==L||W.numSpotShadows!==I||W.numSpotMaps!==T||W.numLightProbes!==F)&&(a.sun.length=x,a.directional.length=y,a.spot.length=C,a.rectArea.length=O,a.point.length=S,a.hemi.length=A,a.sunShadow.length=b,a.sunShadowMap.length=b,a.sunShadowMatrix.length=w,a.sunShadowCascade.length=w,a.directionalShadow.length=U,a.directionalShadowMap.length=U,a.directionalShadowMatrix.length=U,a.pointShadow.length=L,a.pointShadowMap.length=L,a.pointShadowMatrix.length=L,a.spotShadow.length=I,a.spotShadowMap.length=I,a.spotLightMatrix.length=I+T-P,a.spotLightMap.length=T,a.numSpotLightShadowsWithMaps=P,a.numLightProbes=F,W.sunLength=x,W.directionalLength=y,W.pointLength=S,W.spotLength=C,W.rectAreaLength=O,W.hemiLength=A,W.numSunShadows=b,W.numDirectionalShadows=U,W.numPointShadows=L,W.numSpotShadows=I,W.numSpotMaps=T,W.numLightProbes=F,a.version=r2++)}function m(d,v){let _=0,g=0,x=0,b=0,w=0,y=0;const S=v.matrixWorldInverse;for(let C=0,O=d.length;C<O;C++){const A=d[C];if(A.isSunLight){const U=a.sun[_];U.direction.setFromMatrixPosition(A.matrixWorld),U.direction.transformDirection(S),_++}else if(A.isDirectionalLight){const U=a.directional[g];U.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),U.direction.sub(o),U.direction.transformDirection(S),g++}else if(A.isSpotLight){const U=a.spot[b];U.position.setFromMatrixPosition(A.matrixWorld),U.position.applyMatrix4(S),U.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),U.direction.sub(o),U.direction.transformDirection(S),b++}else if(A.isRectAreaLight){const U=a.rectArea[w];U.position.setFromMatrixPosition(A.matrixWorld),U.position.applyMatrix4(S),u.identity(),c.copy(A.matrixWorld),c.premultiply(S),u.extractRotation(c),U.halfWidth.set(A.width*.5,0,0),U.halfHeight.set(0,A.height*.5,0),U.halfWidth.applyMatrix4(u),U.halfHeight.applyMatrix4(u),w++}else if(A.isPointLight){const U=a.point[x];U.position.setFromMatrixPosition(A.matrixWorld),U.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const U=a.hemi[y];U.direction.setFromMatrixPosition(A.matrixWorld),U.direction.transformDirection(S),y++}}}return{setup:h,setupView:m,state:a}}function Q_(r){const t=new l2(r),n=[],a=[],o=[];function c(g){_.camera=g,n.length=0,a.length=0,o.length=0}function u(g){n.push(g)}function h(g){a.push(g)}function m(g){o.push(g)}function d(){t.setup(n)}function v(g){t.setupView(n,g)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:d,setupLightsView:v,pushLight:u,pushShadow:h,pushLightProbeGrid:m}}function c2(r){let t=new WeakMap;function n(o,c=0){const u=t.get(o);let h;return u===void 0?(h=new Q_(r),t.set(o,[h])):c>=u.length?(h=new Q_(r),u.push(h)):h=u[c],h}function a(){t=new WeakMap}return{get:n,dispose:a}}const u2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f2=`uniform sampler2D shadow_pass;
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
}`,h2=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],d2=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],j_=new Ee,rl=new G,Ed=new G;function p2(r,t,n){let a=new Ip;const o=new Wt,c=new Wt,u=new an,h=new M1,m=new b1,d={},v=n.maxTextureSize,_={[Xs]:Wn,[Wn]:Xs,[ei]:ei},g=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:u2,fragmentShader:f2}),x=g.clone();x.defines.HORIZONTAL_PASS=1;const b=new dn;b.setAttribute("position",new Gi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Ge(b,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pu;let S=this.type;this.render=function(L,I,T){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||L.length===0)return;this.type===ox&&(ae("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=pu);const P=r.getRenderTarget(),F=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),H=r.state;H.setBlending(La),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const $=S!==this.type;$&&I.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(tt=>tt.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,tt=L.length;k<tt;k++){const B=L[k],X=B.shadow;if(X===void 0){ae("WebGLShadowMap:",B,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;o.copy(X.mapSize);const q=X.getFrameExtents();o.multiply(q),c.copy(X.mapSize),(o.x>v||o.y>v)&&(o.x>v&&(c.x=Math.floor(v/q.x),o.x=c.x*q.x,X.mapSize.x=c.x),o.y>v&&(c.y=Math.floor(v/q.y),o.y=c.y*q.y,X.mapSize.y=c.y));const nt=r.state.buffers.depth.getReversed();if(X.camera._reversedDepth=nt,X.map===null||$===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===cl){if(B.isPointLight){ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Di(o.x,o.y,{format:qs,type:ki,minFilter:Fn,magFilter:Fn,generateMipmaps:!1}),X.map.texture.name=B.name+".shadowMap",X.map.depthTexture=new Tl(o.x,o.y,Fi),X.map.depthTexture.name=B.name+".shadowMapDepth",X.map.depthTexture.format=Oa,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=On,X.map.depthTexture.magFilter=On}else B.isPointLight?(X.map=new Zx(o.x),X.map.depthTexture=new Hb(o.x,na)):(X.map=new Di(o.x,o.y),X.map.depthTexture=new Tl(o.x,o.y,na)),X.map.depthTexture.name=B.name+".shadowMap",X.map.depthTexture.format=Oa,this.type===pu?(X.map.depthTexture.compareFunction=nt?Cp:Rp,X.map.depthTexture.minFilter=Fn,X.map.depthTexture.magFilter=Fn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=On,X.map.depthTexture.magFilter=On);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==o.x||X.map.height!==o.y)&&X.map.setSize(o.x,o.y);const rt=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();B.isPointLight!==!0&&X.updateMatrices(B,T);for(let N=0;N<rt;N++){const et=X.getCamera(N);if(B.isPointLight){const Q=X.camera,j=X.matrix,bt=B.distance||Q.far;bt!==Q.far&&(Q.far=bt,Q.updateProjectionMatrix()),rl.setFromMatrixPosition(B.matrixWorld),Q.position.copy(rl),Ed.copy(Q.position),Ed.add(h2[N]),Q.up.copy(d2[N]),Q.lookAt(Ed),Q.updateMatrixWorld(),j.makeTranslation(-rl.x,-rl.y,-rl.z),j_.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),X._frustum.setFromProjectionMatrix(j_,Q.coordinateSystem,Q.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)r.setRenderTarget(X.map,N),r.clear();else{N===0&&(r.setRenderTarget(X.map),r.clear());const Q=X.getViewport(N);u.set(c.x*Q.x,c.y*Q.y,c.x*Q.z,c.y*Q.w),H.viewport(u)}a=X.getFrustum(N),A(I,T,et,B,this.type)}X.isPointLightShadow!==!0&&this.type===cl&&C(X,T),X.needsUpdate=!1}S=this.type,y.needsUpdate=!1,r.setRenderTarget(P,F,W)};function C(L,I){const T=t.update(w);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,x.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,x.needsUpdate=!0),L.mapPass===null?L.mapPass=new Di(o.x,o.y,{format:qs,type:ki}):(L.mapPass.width!==L.map.width||L.mapPass.height!==L.map.height)&&L.mapPass.setSize(L.map.width,L.map.height),g.uniforms.shadow_pass.value=L.map.depthTexture,g.uniforms.resolution.value.set(L.map.width,L.map.height),g.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(I,null,T,g,w,null),x.uniforms.shadow_pass.value=L.mapPass.texture,x.uniforms.resolution.value.set(L.map.width,L.map.height),x.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(I,null,T,x,w,null)}function O(L,I,T,P){let F=null;const W=T.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(W!==void 0)F=W;else if(F=T.isPointLight===!0?m:h,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const H=F.uuid,$=I.uuid;let k=d[H];k===void 0&&(k={},d[H]=k);let tt=k[$];tt===void 0&&(tt=F.clone(),k[$]=tt,I.addEventListener("dispose",U)),F=tt}if(F.visible=I.visible,F.wireframe=I.wireframe,P===cl?F.side=I.shadowSide!==null?I.shadowSide:I.side:F.side=I.shadowSide!==null?I.shadowSide:_[I.side],F.alphaMap=I.alphaMap,F.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,F.map=I.map,F.clipShadows=I.clipShadows,F.clippingPlanes=I.clippingPlanes,F.clipIntersection=I.clipIntersection,F.displacementMap=I.displacementMap,F.displacementScale=I.displacementScale,F.displacementBias=I.displacementBias,F.wireframeLinewidth=I.wireframeLinewidth,F.linewidth=I.linewidth,T.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const H=r.properties.get(F);H.light=T}return F}function A(L,I,T,P,F){if(L.visible===!1)return;if(L.layers.test(I.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&F===cl)&&(!L.frustumCulled||L.intersectsFrustum(a))){L.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,L.matrixWorld);const $=t.update(L),k=L.material;if(Array.isArray(k)){const tt=$.groups;for(let B=0,X=tt.length;B<X;B++){const q=tt[B],nt=k[q.materialIndex];if(nt&&nt.visible){const rt=O(L,nt,P,F);L.onBeforeShadow(r,L,I,T,$,rt,q),r.renderBufferDirect(T,null,$,rt,L,q),L.onAfterShadow(r,L,I,T,$,rt,q)}}}else if(k.visible){const tt=O(L,k,P,F);L.onBeforeShadow(r,L,I,T,$,tt,null),r.renderBufferDirect(T,null,$,tt,L,null),L.onAfterShadow(r,L,I,T,$,tt,null)}}const H=L.children;for(let $=0,k=H.length;$<k;$++)A(H[$],I,T,P,F)}function U(L){L.target.removeEventListener("dispose",U);for(const T in d){const P=d[T],F=L.target.uuid;F in P&&(P[F].dispose(),delete P[F])}}}function m2(r,t){function n(){let J=!1;const Dt=new an;let St=null;const Lt=new an(0,0,0,0);return{setMask:function(Ft){St!==Ft&&!J&&(r.colorMask(Ft,Ft,Ft,Ft),St=Ft)},setLocked:function(Ft){J=Ft},setClear:function(Ft,Et,Jt,qt,We){We===!0&&(Ft*=qt,Et*=qt,Jt*=qt),Dt.set(Ft,Et,Jt,qt),Lt.equals(Dt)===!1&&(r.clearColor(Ft,Et,Jt,qt),Lt.copy(Dt))},reset:function(){J=!1,St=null,Lt.set(-1,0,0,0)}}}function a(){let J=!1,Dt=!1,St=null,Lt=null,Ft=null;return{setReversed:function(Et){if(Dt!==Et){const Jt=t.get("EXT_clip_control");Et?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT),Dt=Et;const qt=Ft;Ft=null,this.setClear(qt)}},getReversed:function(){return Dt},setTest:function(Et){Et?pt(r.DEPTH_TEST):Tt(r.DEPTH_TEST)},setMask:function(Et){St!==Et&&!J&&(r.depthMask(Et),St=Et)},setFunc:function(Et){if(Dt&&(Et=jM[Et]),Lt!==Et){switch(Et){case Td:r.depthFunc(r.NEVER);break;case Ad:r.depthFunc(r.ALWAYS);break;case wd:r.depthFunc(r.LESS);break;case Sl:r.depthFunc(r.LEQUAL);break;case Rd:r.depthFunc(r.EQUAL);break;case Cd:r.depthFunc(r.GEQUAL);break;case Dd:r.depthFunc(r.GREATER);break;case Ud:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Lt=Et}},setLocked:function(Et){J=Et},setClear:function(Et){Ft!==Et&&(Ft=Et,Dt&&(Et=1-Et),r.clearDepth(Et))},reset:function(){J=!1,St=null,Lt=null,Ft=null,Dt=!1}}}function o(){let J=!1,Dt=null,St=null,Lt=null,Ft=null,Et=null,Jt=null,qt=null,We=null;return{setTest:function(Ue){J||(Ue?pt(r.STENCIL_TEST):Tt(r.STENCIL_TEST))},setMask:function(Ue){Dt!==Ue&&!J&&(r.stencilMask(Ue),Dt=Ue)},setFunc:function(Ue,qn,ii){(St!==Ue||Lt!==qn||Ft!==ii)&&(r.stencilFunc(Ue,qn,ii),St=Ue,Lt=qn,Ft=ii)},setOp:function(Ue,qn,ii){(Et!==Ue||Jt!==qn||qt!==ii)&&(r.stencilOp(Ue,qn,ii),Et=Ue,Jt=qn,qt=ii)},setLocked:function(Ue){J=Ue},setClear:function(Ue){We!==Ue&&(r.clearStencil(Ue),We=Ue)},reset:function(){J=!1,Dt=null,St=null,Lt=null,Ft=null,Et=null,Jt=null,qt=null,We=null}}}const c=new n,u=new a,h=new o,m=new WeakMap,d=new WeakMap;let v={},_={},g={},x=new WeakMap,b=[],w=null,y=!1,S=null,C=null,O=null,A=null,U=null,L=null,I=null,T=new te(0,0,0),P=0,F=!1,W=null,H=null,$=null,k=null,tt=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,q=0;const nt=r.getParameter(r.VERSION);nt.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(nt)[1]),X=q>=1):nt.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),X=q>=2);let rt=null,N={};const et=r.getParameter(r.SCISSOR_BOX),Q=r.getParameter(r.VIEWPORT),j=new an().fromArray(et),bt=new an().fromArray(Q);function wt(J,Dt,St,Lt){const Ft=new Uint8Array(4),Et=r.createTexture();r.bindTexture(J,Et),r.texParameteri(J,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(J,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Jt=0;Jt<St;Jt++)J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?r.texImage3D(Dt,0,r.RGBA,1,1,Lt,0,r.RGBA,r.UNSIGNED_BYTE,Ft):r.texImage2D(Dt+Jt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ft);return Et}const st={};st[r.TEXTURE_2D]=wt(r.TEXTURE_2D,r.TEXTURE_2D,1),st[r.TEXTURE_CUBE_MAP]=wt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[r.TEXTURE_2D_ARRAY]=wt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),st[r.TEXTURE_3D]=wt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),h.setClear(0),pt(r.DEPTH_TEST),u.setFunc(Sl),ue(!1),we(Hv),pt(r.CULL_FACE),me(La);function pt(J){v[J]!==!0&&(r.enable(J),v[J]=!0)}function Tt(J){v[J]!==!1&&(r.disable(J),v[J]=!1)}function It(J,Dt){return g[J]!==Dt?(r.bindFramebuffer(J,Dt),g[J]=Dt,J===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Dt),J===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Dt),!0):!1}function At(J,Dt){let St=b,Lt=!1;if(J){St=x.get(Dt),St===void 0&&(St=[],x.set(Dt,St));const Ft=J.textures;if(St.length!==Ft.length||St[0]!==r.COLOR_ATTACHMENT0){for(let Et=0,Jt=Ft.length;Et<Jt;Et++)St[Et]=r.COLOR_ATTACHMENT0+Et;St.length=Ft.length,Lt=!0}}else St[0]!==r.BACK&&(St[0]=r.BACK,Lt=!0);Lt&&r.drawBuffers(St)}function ee(J){return w!==J?(r.useProgram(J),w=J,!0):!1}const Be={[Wr]:r.FUNC_ADD,[xM]:r.FUNC_SUBTRACT,[SM]:r.FUNC_REVERSE_SUBTRACT};Be[yM]=r.MIN,Be[MM]=r.MAX;const ne={[bM]:r.ZERO,[EM]:r.ONE,[TM]:r.SRC_COLOR,[lx]:r.SRC_ALPHA,[UM]:r.SRC_ALPHA_SATURATE,[CM]:r.DST_COLOR,[wM]:r.DST_ALPHA,[AM]:r.ONE_MINUS_SRC_COLOR,[cx]:r.ONE_MINUS_SRC_ALPHA,[DM]:r.ONE_MINUS_DST_COLOR,[RM]:r.ONE_MINUS_DST_ALPHA,[LM]:r.CONSTANT_COLOR,[NM]:r.ONE_MINUS_CONSTANT_COLOR,[OM]:r.CONSTANT_ALPHA,[PM]:r.ONE_MINUS_CONSTANT_ALPHA};function me(J,Dt,St,Lt,Ft,Et,Jt,qt,We,Ue){if(J===La){y===!0&&(Tt(r.BLEND),y=!1);return}if(y===!1&&(pt(r.BLEND),y=!0),J!==_M){if(J!==S||Ue!==F){if((C!==Wr||U!==Wr)&&(r.blendEquation(r.FUNC_ADD),C=Wr,U=Wr),Ue)switch(J){case dl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yu:r.blendFunc(r.ONE,r.ONE);break;case Gv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Vv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ne("WebGLState: Invalid blending: ",J);break}else switch(J){case dl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Gv:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vv:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",J);break}O=null,A=null,L=null,I=null,T.set(0,0,0),P=0,S=J,F=Ue}return}Ft=Ft||Dt,Et=Et||St,Jt=Jt||Lt,(Dt!==C||Ft!==U)&&(r.blendEquationSeparate(Be[Dt],Be[Ft]),C=Dt,U=Ft),(St!==O||Lt!==A||Et!==L||Jt!==I)&&(r.blendFuncSeparate(ne[St],ne[Lt],ne[Et],ne[Jt]),O=St,A=Lt,L=Et,I=Jt),(qt.equals(T)===!1||We!==P)&&(r.blendColor(qt.r,qt.g,qt.b,We),T.copy(qt),P=We),S=J,F=!1}function Ce(J,Dt){J.side===ei?Tt(r.CULL_FACE):pt(r.CULL_FACE);let St=J.side===Wn;Dt&&(St=!St),ue(St),J.blending===dl&&J.transparent===!1?me(La):me(J.blending,J.blendEquation,J.blendSrc,J.blendDst,J.blendEquationAlpha,J.blendSrcAlpha,J.blendDstAlpha,J.blendColor,J.blendAlpha,J.premultipliedAlpha),u.setFunc(J.depthFunc),u.setTest(J.depthTest),u.setMask(J.depthWrite),c.setMask(J.colorWrite);const Lt=J.stencilWrite;h.setTest(Lt),Lt&&(h.setMask(J.stencilWriteMask),h.setFunc(J.stencilFunc,J.stencilRef,J.stencilFuncMask),h.setOp(J.stencilFail,J.stencilZFail,J.stencilZPass)),ln(J.polygonOffset,J.polygonOffsetFactor,J.polygonOffsetUnits),J.alphaToCoverage===!0?pt(r.SAMPLE_ALPHA_TO_COVERAGE):Tt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ue(J){W!==J&&(J?r.frontFace(r.CW):r.frontFace(r.CCW),W=J)}function we(J){J!==gM?(pt(r.CULL_FACE),J!==H&&(J===Hv?r.cullFace(r.BACK):J===vM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Tt(r.CULL_FACE),H=J}function je(J){J!==$&&(X&&r.lineWidth(J),$=J)}function ln(J,Dt,St){J?(pt(r.POLYGON_OFFSET_FILL),(k!==Dt||tt!==St)&&(k=Dt,tt=St,u.getReversed()&&(Dt=-Dt),r.polygonOffset(Dt,St))):Tt(r.POLYGON_OFFSET_FILL)}function Oe(J){J?pt(r.SCISSOR_TEST):Tt(r.SCISSOR_TEST)}function $e(J){J===void 0&&(J=r.TEXTURE0+B-1),rt!==J&&(r.activeTexture(J),rt=J)}function K(J,Dt,St){St===void 0&&(rt===null?St=r.TEXTURE0+B-1:St=rt);let Lt=N[St];Lt===void 0&&(Lt={type:void 0,texture:void 0},N[St]=Lt),(Lt.type!==J||Lt.texture!==Dt)&&(rt!==St&&(r.activeTexture(St),rt=St),r.bindTexture(J,Dt||st[J]),Lt.type=J,Lt.texture=Dt)}function De(){const J=N[rt];J!==void 0&&J.type!==void 0&&(r.bindTexture(J.type,null),J.type=void 0,J.texture=void 0)}function _e(){try{r.compressedTexImage2D(...arguments)}catch(J){Ne("WebGLState:",J)}}function z(){try{r.compressedTexImage3D(...arguments)}catch(J){Ne("WebGLState:",J)}}function E(){try{r.texSubImage2D(...arguments)}catch(J){Ne("WebGLState:",J)}}function it(){try{r.texSubImage3D(...arguments)}catch(J){Ne("WebGLState:",J)}}function ot(){try{r.compressedTexSubImage2D(...arguments)}catch(J){Ne("WebGLState:",J)}}function vt(){try{r.compressedTexSubImage3D(...arguments)}catch(J){Ne("WebGLState:",J)}}function Rt(){try{r.texStorage2D(...arguments)}catch(J){Ne("WebGLState:",J)}}function Ut(){try{r.texStorage3D(...arguments)}catch(J){Ne("WebGLState:",J)}}function gt(){try{r.texImage2D(...arguments)}catch(J){Ne("WebGLState:",J)}}function _t(){try{r.texImage3D(...arguments)}catch(J){Ne("WebGLState:",J)}}function Ct(J){return _[J]!==void 0?_[J]:r.getParameter(J)}function Vt(J,Dt){_[J]!==Dt&&(r.pixelStorei(J,Dt),_[J]=Dt)}function Pt(J){j.equals(J)===!1&&(r.scissor(J.x,J.y,J.z,J.w),j.copy(J))}function Nt(J){bt.equals(J)===!1&&(r.viewport(J.x,J.y,J.z,J.w),bt.copy(J))}function Qt(J,Dt){let St=d.get(Dt);St===void 0&&(St=new WeakMap,d.set(Dt,St));let Lt=St.get(J);Lt===void 0&&(Lt=r.getUniformBlockIndex(Dt,J.name),St.set(J,Lt))}function jt(J,Dt){const Lt=d.get(Dt).get(J);m.get(Dt)!==Lt&&(r.uniformBlockBinding(Dt,Lt,J.__bindingPointIndex),m.set(Dt,Lt))}function se(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},rt=null,N={},g={},x=new WeakMap,b=[],w=null,y=!1,S=null,C=null,O=null,A=null,U=null,L=null,I=null,T=new te(0,0,0),P=0,F=!1,W=null,H=null,$=null,k=null,tt=null,j.set(0,0,r.canvas.width,r.canvas.height),bt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),h.reset()}return{buffers:{color:c,depth:u,stencil:h},enable:pt,disable:Tt,bindFramebuffer:It,drawBuffers:At,useProgram:ee,setBlending:me,setMaterial:Ce,setFlipSided:ue,setCullFace:we,setLineWidth:je,setPolygonOffset:ln,setScissorTest:Oe,activeTexture:$e,bindTexture:K,unbindTexture:De,compressedTexImage2D:_e,compressedTexImage3D:z,texImage2D:gt,texImage3D:_t,pixelStorei:Vt,getParameter:Ct,updateUBOMapping:Qt,uniformBlockBinding:jt,texStorage2D:Rt,texStorage3D:Ut,texSubImage2D:E,texSubImage3D:it,compressedTexSubImage2D:ot,compressedTexSubImage3D:vt,scissor:Pt,viewport:Nt,reset:se}}function g2(r,t,n,a,o,c,u){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Wt,v=new WeakMap,_=new Set;let g;const x=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(z,E){return b?new OffscreenCanvas(z,E):wu("canvas")}function y(z,E,it){let ot=1;const vt=_e(z);if((vt.width>it||vt.height>it)&&(ot=it/Math.max(vt.width,vt.height)),ot<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const Rt=Math.floor(ot*vt.width),Ut=Math.floor(ot*vt.height);g===void 0&&(g=w(Rt,Ut));const gt=E?w(Rt,Ut):g;return gt.width=Rt,gt.height=Ut,gt.getContext("2d").drawImage(z,0,0,Rt,Ut),ae("WebGLRenderer: Texture has been resized from ("+vt.width+"x"+vt.height+") to ("+Rt+"x"+Ut+")."),gt}else return"data"in z&&ae("WebGLRenderer: Image in DataTexture is too big ("+vt.width+"x"+vt.height+")."),z;return z}function S(z){return z.generateMipmaps}function C(z){r.generateMipmap(z)}function O(z){return z.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?r.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(z,E,it,ot,vt,Rt=!1){if(z!==null){if(r[z]!==void 0)return r[z];ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let Ut;ot&&(Ut=t.get("EXT_texture_norm16"),Ut||ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let gt=E;if(E===r.RED&&(it===r.FLOAT&&(gt=r.R32F),it===r.HALF_FLOAT&&(gt=r.R16F),it===r.UNSIGNED_BYTE&&(gt=r.R8),it===r.UNSIGNED_SHORT&&Ut&&(gt=Ut.R16_EXT),it===r.SHORT&&Ut&&(gt=Ut.R16_SNORM_EXT)),E===r.RED_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.R8UI),it===r.UNSIGNED_SHORT&&(gt=r.R16UI),it===r.UNSIGNED_INT&&(gt=r.R32UI),it===r.BYTE&&(gt=r.R8I),it===r.SHORT&&(gt=r.R16I),it===r.INT&&(gt=r.R32I)),E===r.RG&&(it===r.FLOAT&&(gt=r.RG32F),it===r.HALF_FLOAT&&(gt=r.RG16F),it===r.UNSIGNED_BYTE&&(gt=r.RG8),it===r.UNSIGNED_SHORT&&Ut&&(gt=Ut.RG16_EXT),it===r.SHORT&&Ut&&(gt=Ut.RG16_SNORM_EXT)),E===r.RG_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RG8UI),it===r.UNSIGNED_SHORT&&(gt=r.RG16UI),it===r.UNSIGNED_INT&&(gt=r.RG32UI),it===r.BYTE&&(gt=r.RG8I),it===r.SHORT&&(gt=r.RG16I),it===r.INT&&(gt=r.RG32I)),E===r.RGB_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),it===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),it===r.UNSIGNED_INT&&(gt=r.RGB32UI),it===r.BYTE&&(gt=r.RGB8I),it===r.SHORT&&(gt=r.RGB16I),it===r.INT&&(gt=r.RGB32I)),E===r.RGBA_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),it===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),it===r.UNSIGNED_INT&&(gt=r.RGBA32UI),it===r.BYTE&&(gt=r.RGBA8I),it===r.SHORT&&(gt=r.RGBA16I),it===r.INT&&(gt=r.RGBA32I)),E===r.RGB&&(it===r.UNSIGNED_SHORT&&Ut&&(gt=Ut.RGB16_EXT),it===r.SHORT&&Ut&&(gt=Ut.RGB16_SNORM_EXT),it===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),it===r.UNSIGNED_INT_10F_11F_11F_REV&&(gt=r.R11F_G11F_B10F)),E===r.RGBA){const _t=Rt?Au:Ae.getTransfer(vt);it===r.FLOAT&&(gt=r.RGBA32F),it===r.HALF_FLOAT&&(gt=r.RGBA16F),it===r.UNSIGNED_BYTE&&(gt=_t===Xe?r.SRGB8_ALPHA8:r.RGBA8),it===r.UNSIGNED_SHORT&&Ut&&(gt=Ut.RGBA16_EXT),it===r.SHORT&&Ut&&(gt=Ut.RGBA16_SNORM_EXT),it===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),it===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function U(z,E){let it;return z?E===null||E===na||E===Ml?it=r.DEPTH24_STENCIL8:E===Fi?it=r.DEPTH32F_STENCIL8:E===yl&&(it=r.DEPTH24_STENCIL8,ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===na||E===Ml?it=r.DEPTH_COMPONENT24:E===Fi?it=r.DEPTH_COMPONENT32F:E===yl&&(it=r.DEPTH_COMPONENT16),it}function L(z,E){return S(z)===!0||z.isFramebufferTexture&&z.minFilter!==On&&z.minFilter!==Fn?Math.log2(Math.max(E.width,E.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?E.mipmaps.length:1}function I(z){const E=z.target;E.removeEventListener("dispose",I),P(E),E.isVideoTexture&&v.delete(E),E.isHTMLTexture&&_.delete(E)}function T(z){const E=z.target;E.removeEventListener("dispose",T),W(E)}function P(z){const E=a.get(z);if(E.__webglInit===void 0)return;const it=z.source,ot=x.get(it);if(ot){const vt=ot[E.__cacheKey];vt.usedTimes--,vt.usedTimes===0&&F(z),Object.keys(ot).length===0&&x.delete(it)}a.remove(z)}function F(z){const E=a.get(z);r.deleteTexture(E.__webglTexture);const it=z.source,ot=x.get(it);delete ot[E.__cacheKey],u.memory.textures--}function W(z){const E=a.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),a.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(E.__webglFramebuffer[ot]))for(let vt=0;vt<E.__webglFramebuffer[ot].length;vt++)r.deleteFramebuffer(E.__webglFramebuffer[ot][vt]);else r.deleteFramebuffer(E.__webglFramebuffer[ot]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[ot])}else{if(Array.isArray(E.__webglFramebuffer))for(let ot=0;ot<E.__webglFramebuffer.length;ot++)r.deleteFramebuffer(E.__webglFramebuffer[ot]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ot=0;ot<E.__webglColorRenderbuffer.length;ot++)E.__webglColorRenderbuffer[ot]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[ot]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const it=z.textures;for(let ot=0,vt=it.length;ot<vt;ot++){const Rt=a.get(it[ot]);Rt.__webglTexture&&(r.deleteTexture(Rt.__webglTexture),u.memory.textures--),a.remove(it[ot])}a.remove(z)}let H=0;function $(){H=0}function k(){return H}function tt(z){H=z}function B(){const z=H;return z>=o.maxTextures&&ae("WebGLTextures: Trying to use "+(z+1)+" texture units while this GPU supports only "+o.maxTextures),H+=1,z}function X(z){const E=[];return E.push(z.wrapS),E.push(z.wrapT),E.push(z.wrapR||0),E.push(z.magFilter),E.push(z.minFilter),E.push(z.anisotropy),E.push(z.internalFormat),E.push(z.format),E.push(z.type),E.push(z.generateMipmaps),E.push(z.premultiplyAlpha),E.push(z.flipY),E.push(z.unpackAlignment),E.push(z.colorSpace),E.join()}function q(z,E){const it=a.get(z);if(z.isVideoTexture&&K(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&it.__version!==z.version){const ot=z.image;if(ot===null)ae("WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)ae("WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(it,z,E);return}}else z.isExternalTexture&&(it.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,it.__webglTexture,r.TEXTURE0+E)}function nt(z,E){const it=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&it.__version!==z.version){Tt(it,z,E);return}else z.isExternalTexture&&(it.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,it.__webglTexture,r.TEXTURE0+E)}function rt(z,E){const it=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&it.__version!==z.version){Tt(it,z,E);return}n.bindTexture(r.TEXTURE_3D,it.__webglTexture,r.TEXTURE0+E)}function N(z,E){const it=a.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&it.__version!==z.version){It(it,z,E);return}n.bindTexture(r.TEXTURE_CUBE_MAP,it.__webglTexture,r.TEXTURE0+E)}const et={[Mu]:r.REPEAT,[Da]:r.CLAMP_TO_EDGE,[Ld]:r.MIRRORED_REPEAT},Q={[On]:r.NEAREST,[BM]:r.NEAREST_MIPMAP_NEAREST,[Gc]:r.NEAREST_MIPMAP_LINEAR,[Fn]:r.LINEAR,[Yh]:r.LINEAR_MIPMAP_NEAREST,[Gs]:r.LINEAR_MIPMAP_LINEAR},j={[VM]:r.NEVER,[YM]:r.ALWAYS,[kM]:r.LESS,[Rp]:r.LEQUAL,[XM]:r.EQUAL,[Cp]:r.GEQUAL,[WM]:r.GREATER,[qM]:r.NOTEQUAL};function bt(z,E){if(E.type===Fi&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Fn||E.magFilter===Yh||E.magFilter===Gc||E.magFilter===Gs||E.minFilter===Fn||E.minFilter===Yh||E.minFilter===Gc||E.minFilter===Gs)&&ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(z,r.TEXTURE_WRAP_S,et[E.wrapS]),r.texParameteri(z,r.TEXTURE_WRAP_T,et[E.wrapT]),(z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY)&&r.texParameteri(z,r.TEXTURE_WRAP_R,et[E.wrapR]),r.texParameteri(z,r.TEXTURE_MAG_FILTER,Q[E.magFilter]),r.texParameteri(z,r.TEXTURE_MIN_FILTER,Q[E.minFilter]),E.compareFunction&&(r.texParameteri(z,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(z,r.TEXTURE_COMPARE_FUNC,j[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===On||E.minFilter!==Gc&&E.minFilter!==Gs||E.type===Fi&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||a.get(E).__currentAnisotropy){const it=t.get("EXT_texture_filter_anisotropic");r.texParameterf(z,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,o.getMaxAnisotropy())),a.get(E).__currentAnisotropy=E.anisotropy}}}function wt(z,E){let it=!1;z.__webglInit===void 0&&(z.__webglInit=!0,E.addEventListener("dispose",I));const ot=E.source;let vt=x.get(ot);vt===void 0&&(vt={},x.set(ot,vt));const Rt=X(E);if(Rt!==z.__cacheKey){vt[Rt]===void 0&&(vt[Rt]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,it=!0),vt[Rt].usedTimes++;const Ut=vt[z.__cacheKey];Ut!==void 0&&(vt[z.__cacheKey].usedTimes--,Ut.usedTimes===0&&F(E)),z.__cacheKey=Rt,z.__webglTexture=vt[Rt].texture}return it}function st(z,E,it){return Math.floor(Math.floor(z/it)/E)}function pt(z,E,it,ot){const Rt=z.updateRanges;if(Rt.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,E.width,E.height,it,ot,E.data);else{Rt.sort((Vt,Pt)=>Vt.start-Pt.start);let Ut=0;for(let Vt=1;Vt<Rt.length;Vt++){const Pt=Rt[Ut],Nt=Rt[Vt],Qt=Pt.start+Pt.count,jt=st(Nt.start,E.width,4),se=st(Pt.start,E.width,4);Nt.start<=Qt+1&&jt===se&&st(Nt.start+Nt.count-1,E.width,4)===jt?Pt.count=Math.max(Pt.count,Nt.start+Nt.count-Pt.start):(++Ut,Rt[Ut]=Nt)}Rt.length=Ut+1;const gt=n.getParameter(r.UNPACK_ROW_LENGTH),_t=n.getParameter(r.UNPACK_SKIP_PIXELS),Ct=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,E.width);for(let Vt=0,Pt=Rt.length;Vt<Pt;Vt++){const Nt=Rt[Vt],Qt=Math.floor(Nt.start/4),jt=Math.ceil(Nt.count/4),se=Qt%E.width,J=Math.floor(Qt/E.width),Dt=jt,St=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,se),n.pixelStorei(r.UNPACK_SKIP_ROWS,J),n.texSubImage2D(r.TEXTURE_2D,0,se,J,Dt,St,it,ot,E.data)}z.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,gt),n.pixelStorei(r.UNPACK_SKIP_PIXELS,_t),n.pixelStorei(r.UNPACK_SKIP_ROWS,Ct)}}function Tt(z,E,it){let ot=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ot=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ot=r.TEXTURE_3D);const vt=wt(z,E),Rt=E.source;n.bindTexture(ot,z.__webglTexture,r.TEXTURE0+it);const Ut=a.get(Rt);if(Rt.version!==Ut.__version||vt===!0){if(n.activeTexture(r.TEXTURE0+it),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const St=Ae.getPrimaries(Ae.workingColorSpace),Lt=E.colorSpace===Ca?null:Ae.getPrimaries(E.colorSpace),Ft=E.colorSpace===Ca||St===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft)}n.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment);let _t=y(E.image,!1,o.maxTextureSize);_t=De(E,_t);const Ct=c.convert(E.format,E.colorSpace),Vt=c.convert(E.type);let Pt=A(E.internalFormat,Ct,Vt,E.normalized,E.colorSpace,E.isVideoTexture);bt(ot,E);let Nt;const Qt=E.mipmaps,jt=E.isVideoTexture!==!0,se=Ut.__version===void 0||vt===!0,J=Rt.dataReady,Dt=L(E,_t);if(E.isDepthTexture)Pt=U(E.format===Vs,E.type),se&&(jt?n.texStorage2D(r.TEXTURE_2D,1,Pt,_t.width,_t.height):n.texImage2D(r.TEXTURE_2D,0,Pt,_t.width,_t.height,0,Ct,Vt,null));else if(E.isDataTexture)if(Qt.length>0){jt&&se&&n.texStorage2D(r.TEXTURE_2D,Dt,Pt,Qt[0].width,Qt[0].height);for(let St=0,Lt=Qt.length;St<Lt;St++)Nt=Qt[St],jt?J&&n.texSubImage2D(r.TEXTURE_2D,St,0,0,Nt.width,Nt.height,Ct,Vt,Nt.data):n.texImage2D(r.TEXTURE_2D,St,Pt,Nt.width,Nt.height,0,Ct,Vt,Nt.data);E.generateMipmaps=!1}else jt?(se&&n.texStorage2D(r.TEXTURE_2D,Dt,Pt,_t.width,_t.height),J&&pt(E,_t,Ct,Vt)):n.texImage2D(r.TEXTURE_2D,0,Pt,_t.width,_t.height,0,Ct,Vt,_t.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){jt&&se&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Dt,Pt,Qt[0].width,Qt[0].height,_t.depth);for(let St=0,Lt=Qt.length;St<Lt;St++)if(Nt=Qt[St],E.format!==Hi)if(Ct!==null)if(jt){if(J)if(E.layerUpdates.size>0){const Ft=U_(Nt.width,Nt.height,E.format,E.type);for(const Et of E.layerUpdates){const Jt=Nt.data.subarray(Et*Ft/Nt.data.BYTES_PER_ELEMENT,(Et+1)*Ft/Nt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,Et,Nt.width,Nt.height,1,Ct,Jt)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,0,Nt.width,Nt.height,_t.depth,Ct,Nt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,St,Pt,Nt.width,Nt.height,_t.depth,0,Nt.data,0,0);else ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else jt?J&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,0,Nt.width,Nt.height,_t.depth,Ct,Vt,Nt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,St,Pt,Nt.width,Nt.height,_t.depth,0,Ct,Vt,Nt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{jt&&se&&n.texStorage2D(r.TEXTURE_2D,Dt,Pt,Qt[0].width,Qt[0].height);for(let St=0,Lt=Qt.length;St<Lt;St++)Nt=Qt[St],E.format!==Hi?Ct!==null?jt?J&&n.compressedTexSubImage2D(r.TEXTURE_2D,St,0,0,Nt.width,Nt.height,Ct,Nt.data):n.compressedTexImage2D(r.TEXTURE_2D,St,Pt,Nt.width,Nt.height,0,Nt.data):ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):jt?J&&n.texSubImage2D(r.TEXTURE_2D,St,0,0,Nt.width,Nt.height,Ct,Vt,Nt.data):n.texImage2D(r.TEXTURE_2D,St,Pt,Nt.width,Nt.height,0,Ct,Vt,Nt.data)}else if(E.isDataArrayTexture)if(jt){if(se&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Dt,Pt,_t.width,_t.height,_t.depth),J)if(E.layerUpdates.size>0){const St=U_(_t.width,_t.height,E.format,E.type);for(const Lt of E.layerUpdates){const Ft=_t.data.subarray(Lt*St/_t.data.BYTES_PER_ELEMENT,(Lt+1)*St/_t.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Lt,_t.width,_t.height,1,Ct,Vt,Ft)}E.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,Ct,Vt,_t.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Pt,_t.width,_t.height,_t.depth,0,Ct,Vt,_t.data);else if(E.isData3DTexture)jt?(se&&n.texStorage3D(r.TEXTURE_3D,Dt,Pt,_t.width,_t.height,_t.depth),J&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,Ct,Vt,_t.data)):n.texImage3D(r.TEXTURE_3D,0,Pt,_t.width,_t.height,_t.depth,0,Ct,Vt,_t.data);else if(E.isFramebufferTexture){if(se)if(jt)n.texStorage2D(r.TEXTURE_2D,Dt,Pt,_t.width,_t.height);else{let St=_t.width,Lt=_t.height;for(let Ft=0;Ft<Dt;Ft++)n.texImage2D(r.TEXTURE_2D,Ft,Pt,St,Lt,0,Ct,Vt,null),St>>=1,Lt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in r){const St=r.canvas;if(St.hasAttribute("layoutsubtree")||St.setAttribute("layoutsubtree","true"),_t.parentNode!==St){St.appendChild(_t),_.add(E),St.onpaint=Lt=>{const Ft=Lt.changedElements;for(const Et of _)Ft.includes(Et.image)&&(Et.needsUpdate=!0)},St.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,_t);else{const Ft=r.RGBA,Et=r.RGBA,Jt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Ft,Et,Jt,_t)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Qt.length>0){if(jt&&se){const St=_e(Qt[0]);n.texStorage2D(r.TEXTURE_2D,Dt,Pt,St.width,St.height)}for(let St=0,Lt=Qt.length;St<Lt;St++)Nt=Qt[St],jt?J&&n.texSubImage2D(r.TEXTURE_2D,St,0,0,Ct,Vt,Nt):n.texImage2D(r.TEXTURE_2D,St,Pt,Ct,Vt,Nt);E.generateMipmaps=!1}else if(jt){if(se){const St=_e(_t);n.texStorage2D(r.TEXTURE_2D,Dt,Pt,St.width,St.height)}J&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Ct,Vt,_t)}else n.texImage2D(r.TEXTURE_2D,0,Pt,Ct,Vt,_t);S(E)&&C(ot),Ut.__version=Rt.version,E.onUpdate&&E.onUpdate(E)}z.__version=E.version}function It(z,E,it){if(E.image.length!==6)return;const ot=wt(z,E),vt=E.source;n.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+it);const Rt=a.get(vt);if(vt.version!==Rt.__version||ot===!0){n.activeTexture(r.TEXTURE0+it);const Ut=Ae.getPrimaries(Ae.workingColorSpace),gt=E.colorSpace===Ca?null:Ae.getPrimaries(E.colorSpace),_t=E.colorSpace===Ca||Ut===gt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Ct=E.isCompressedTexture||E.image[0].isCompressedTexture,Vt=E.image[0]&&E.image[0].isDataTexture,Pt=[];for(let Et=0;Et<6;Et++)!Ct&&!Vt?Pt[Et]=y(E.image[Et],!0,o.maxCubemapSize):Pt[Et]=Vt?E.image[Et].image:E.image[Et],Pt[Et]=De(E,Pt[Et]);const Nt=Pt[0],Qt=c.convert(E.format,E.colorSpace),jt=c.convert(E.type),se=A(E.internalFormat,Qt,jt,E.normalized,E.colorSpace),J=E.isVideoTexture!==!0,Dt=Rt.__version===void 0||ot===!0,St=vt.dataReady;let Lt=L(E,Nt);bt(r.TEXTURE_CUBE_MAP,E);let Ft;if(Ct){J&&Dt&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Lt,se,Nt.width,Nt.height);for(let Et=0;Et<6;Et++){Ft=Pt[Et].mipmaps;for(let Jt=0;Jt<Ft.length;Jt++){const qt=Ft[Jt];E.format!==Hi?Qt!==null?J?St&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt,0,0,qt.width,qt.height,Qt,qt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt,se,qt.width,qt.height,0,qt.data):ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):J?St&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt,0,0,qt.width,qt.height,Qt,jt,qt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt,se,qt.width,qt.height,0,Qt,jt,qt.data)}}}else{if(Ft=E.mipmaps,J&&Dt){Ft.length>0&&Lt++;const Et=_e(Pt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Lt,se,Et.width,Et.height)}for(let Et=0;Et<6;Et++)if(Vt){J?St&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,0,0,Pt[Et].width,Pt[Et].height,Qt,jt,Pt[Et].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,se,Pt[Et].width,Pt[Et].height,0,Qt,jt,Pt[Et].data);for(let Jt=0;Jt<Ft.length;Jt++){const We=Ft[Jt].image[Et].image;J?St&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt+1,0,0,We.width,We.height,Qt,jt,We.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt+1,se,We.width,We.height,0,Qt,jt,We.data)}}else{J?St&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,0,0,Qt,jt,Pt[Et]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,se,Qt,jt,Pt[Et]);for(let Jt=0;Jt<Ft.length;Jt++){const qt=Ft[Jt];J?St&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt+1,0,0,Qt,jt,qt.image[Et]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Jt+1,se,Qt,jt,qt.image[Et])}}}S(E)&&C(r.TEXTURE_CUBE_MAP),Rt.__version=vt.version,E.onUpdate&&E.onUpdate(E)}z.__version=E.version}function At(z,E,it,ot,vt,Rt){const Ut=c.convert(it.format,it.colorSpace),gt=c.convert(it.type),_t=A(it.internalFormat,Ut,gt,it.normalized,it.colorSpace),Ct=a.get(E),Vt=a.get(it);if(Vt.__renderTarget=E,!Ct.__hasExternalTextures){const Pt=Math.max(1,E.width>>Rt),Nt=Math.max(1,E.height>>Rt);vt===r.TEXTURE_3D||vt===r.TEXTURE_2D_ARRAY?n.texImage3D(vt,Rt,_t,Pt,Nt,E.depth,0,Ut,gt,null):n.texImage2D(vt,Rt,_t,Pt,Nt,0,Ut,gt,null)}n.bindFramebuffer(r.FRAMEBUFFER,z),$e(E)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ot,vt,Vt.__webglTexture,0,Oe(E)):(vt===r.TEXTURE_2D||vt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&vt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ot,vt,Vt.__webglTexture,Rt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function ee(z,E,it){if(r.bindRenderbuffer(r.RENDERBUFFER,z),E.depthBuffer){const ot=E.depthTexture,vt=ot&&ot.isDepthTexture?ot.type:null,Rt=U(E.stencilBuffer,vt),Ut=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;$e(E)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Oe(E),Rt,E.width,E.height):it?r.renderbufferStorageMultisample(r.RENDERBUFFER,Oe(E),Rt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,Rt,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ut,r.RENDERBUFFER,z)}else{const ot=E.textures;for(let vt=0;vt<ot.length;vt++){const Rt=ot[vt],Ut=c.convert(Rt.format,Rt.colorSpace),gt=c.convert(Rt.type),_t=A(Rt.internalFormat,Ut,gt,Rt.normalized,Rt.colorSpace);$e(E)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Oe(E),_t,E.width,E.height):it?r.renderbufferStorageMultisample(r.RENDERBUFFER,Oe(E),_t,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,_t,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Be(z,E,it){const ot=E.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,z),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const vt=a.get(E.depthTexture);if(vt.__renderTarget=E,(!vt.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ot){if(vt.__webglInit===void 0&&(vt.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),vt.__webglTexture===void 0){vt.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,vt.__webglTexture),bt(r.TEXTURE_CUBE_MAP,E.depthTexture);const Ct=c.convert(E.depthTexture.format),Vt=c.convert(E.depthTexture.type);let Pt;E.depthTexture.format===Oa?Pt=r.DEPTH_COMPONENT24:E.depthTexture.format===Vs&&(Pt=r.DEPTH24_STENCIL8);for(let Nt=0;Nt<6;Nt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,Pt,E.width,E.height,0,Ct,Vt,null)}}else q(E.depthTexture,0);const Rt=vt.__webglTexture,Ut=Oe(E),gt=ot?r.TEXTURE_CUBE_MAP_POSITIVE_X+it:r.TEXTURE_2D,_t=E.depthTexture.format===Vs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(E.depthTexture.format===Oa)$e(E)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_t,gt,Rt,0,Ut):r.framebufferTexture2D(r.FRAMEBUFFER,_t,gt,Rt,0);else if(E.depthTexture.format===Vs)$e(E)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_t,gt,Rt,0,Ut):r.framebufferTexture2D(r.FRAMEBUFFER,_t,gt,Rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(z){const E=a.get(z),it=z.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==z.depthTexture){const ot=z.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ot){const vt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ot.removeEventListener("dispose",vt)};ot.addEventListener("dispose",vt),E.__depthDisposeCallback=vt}E.__boundDepthTexture=ot}if(z.depthTexture&&!E.__autoAllocateDepthBuffer)if(it)for(let ot=0;ot<6;ot++)Be(E.__webglFramebuffer[ot],z,ot);else{const ot=z.texture.mipmaps;ot&&ot.length>0?Be(E.__webglFramebuffer[0],z,0):Be(E.__webglFramebuffer,z,0)}else if(it){E.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[ot]),E.__webglDepthbuffer[ot]===void 0)E.__webglDepthbuffer[ot]=r.createRenderbuffer(),ee(E.__webglDepthbuffer[ot],z,!1);else{const vt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Rt=E.__webglDepthbuffer[ot];r.bindRenderbuffer(r.RENDERBUFFER,Rt),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,Rt)}}else{const ot=z.texture.mipmaps;if(ot&&ot.length>0?n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),ee(E.__webglDepthbuffer,z,!1);else{const vt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Rt=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Rt),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,Rt)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function me(z,E,it){const ot=a.get(z);E!==void 0&&At(ot.__webglFramebuffer,z,z.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),it!==void 0&&ne(z)}function Ce(z){const E=z.texture,it=a.get(z),ot=a.get(E);z.addEventListener("dispose",T);const vt=z.textures,Rt=z.isWebGLCubeRenderTarget===!0,Ut=vt.length>1;if(Ut||(ot.__webglTexture===void 0&&(ot.__webglTexture=r.createTexture()),ot.__version=E.version,u.memory.textures++),Rt){it.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(E.mipmaps&&E.mipmaps.length>0){it.__webglFramebuffer[gt]=[];for(let _t=0;_t<E.mipmaps.length;_t++)it.__webglFramebuffer[gt][_t]=r.createFramebuffer()}else it.__webglFramebuffer[gt]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){it.__webglFramebuffer=[];for(let gt=0;gt<E.mipmaps.length;gt++)it.__webglFramebuffer[gt]=r.createFramebuffer()}else it.__webglFramebuffer=r.createFramebuffer();if(Ut)for(let gt=0,_t=vt.length;gt<_t;gt++){const Ct=a.get(vt[gt]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=r.createTexture(),u.memory.textures++)}if(z.samples>0&&$e(z)===!1){it.__webglMultisampledFramebuffer=r.createFramebuffer(),it.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let gt=0;gt<vt.length;gt++){const _t=vt[gt];it.__webglColorRenderbuffer[gt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,it.__webglColorRenderbuffer[gt]);const Ct=c.convert(_t.format,_t.colorSpace),Vt=c.convert(_t.type),Pt=A(_t.internalFormat,Ct,Vt,_t.normalized,_t.colorSpace,z.isXRRenderTarget===!0),Nt=Oe(z);r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt,Pt,z.width,z.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+gt,r.RENDERBUFFER,it.__webglColorRenderbuffer[gt])}r.bindRenderbuffer(r.RENDERBUFFER,null),z.depthBuffer&&(it.__webglDepthRenderbuffer=r.createRenderbuffer(),ee(it.__webglDepthRenderbuffer,z,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Rt){n.bindTexture(r.TEXTURE_CUBE_MAP,ot.__webglTexture),bt(r.TEXTURE_CUBE_MAP,E);for(let gt=0;gt<6;gt++)if(E.mipmaps&&E.mipmaps.length>0)for(let _t=0;_t<E.mipmaps.length;_t++)At(it.__webglFramebuffer[gt][_t],z,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,_t);else At(it.__webglFramebuffer[gt],z,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);S(E)&&C(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ut){for(let gt=0,_t=vt.length;gt<_t;gt++){const Ct=vt[gt],Vt=a.get(Ct);let Pt=r.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Pt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Pt,Vt.__webglTexture),bt(Pt,Ct),At(it.__webglFramebuffer,z,Ct,r.COLOR_ATTACHMENT0+gt,Pt,0),S(Ct)&&C(Pt)}n.unbindTexture()}else{let gt=r.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(gt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(gt,ot.__webglTexture),bt(gt,E),E.mipmaps&&E.mipmaps.length>0)for(let _t=0;_t<E.mipmaps.length;_t++)At(it.__webglFramebuffer[_t],z,E,r.COLOR_ATTACHMENT0,gt,_t);else At(it.__webglFramebuffer,z,E,r.COLOR_ATTACHMENT0,gt,0);S(E)&&C(gt),n.unbindTexture()}z.depthBuffer&&ne(z)}function ue(z){const E=z.textures;for(let it=0,ot=E.length;it<ot;it++){const vt=E[it];if(S(vt)){const Rt=O(z),Ut=a.get(vt).__webglTexture;n.bindTexture(Rt,Ut),C(Rt),n.unbindTexture()}}}const we=[],je=[];function ln(z){if(z.samples>0){if($e(z)===!1){const E=z.textures,it=z.width,ot=z.height;let vt=r.COLOR_BUFFER_BIT;const Rt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ut=a.get(z),gt=E.length>1;if(gt)for(let Ct=0;Ct<E.length;Ct++)n.bindFramebuffer(r.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const _t=z.texture.mipmaps;_t&&_t.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Ct=0;Ct<E.length;Ct++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(vt|=r.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(vt|=r.STENCIL_BUFFER_BIT)),gt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ut.__webglColorRenderbuffer[Ct]);const Vt=a.get(E[Ct]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Vt,0)}r.blitFramebuffer(0,0,it,ot,0,0,it,ot,vt,r.NEAREST),m===!0&&(we.length=0,je.length=0,we.push(r.COLOR_ATTACHMENT0+Ct),z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&(we.push(Rt),je.push(Rt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,je)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,we))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),gt)for(let Ct=0;Ct<E.length;Ct++){n.bindFramebuffer(r.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.RENDERBUFFER,Ut.__webglColorRenderbuffer[Ct]);const Vt=a.get(E[Ct]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.TEXTURE_2D,Vt,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&m){const E=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Oe(z){return Math.min(o.maxSamples,z.samples)}function $e(z){const E=a.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function K(z){const E=u.render.frame;v.get(z)!==E&&(v.set(z,E),z.update())}function De(z,E){const it=z.colorSpace,ot=z.format,vt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||it!==Tu&&it!==Ca&&(Ae.getTransfer(it)===Xe?(ot!==Hi||vt!==mi)&&ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",it)),E}function _e(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(d.width=z.naturalWidth||z.width,d.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(d.width=z.displayWidth,d.height=z.displayHeight):(d.width=z.width,d.height=z.height),d}this.allocateTextureUnit=B,this.resetTextureUnits=$,this.getTextureUnits=k,this.setTextureUnits=tt,this.setTexture2D=q,this.setTexture2DArray=nt,this.setTexture3D=rt,this.setTextureCube=N,this.rebindTextures=me,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=ln,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=At,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function v2(r,t){function n(a,o=Ca){let c;const u=Ae.getTransfer(o);if(a===mi)return r.UNSIGNED_BYTE;if(a===Mp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===bp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===Sx)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===yx)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===_x)return r.BYTE;if(a===xx)return r.SHORT;if(a===yl)return r.UNSIGNED_SHORT;if(a===yp)return r.INT;if(a===na)return r.UNSIGNED_INT;if(a===Fi)return r.FLOAT;if(a===ki)return r.HALF_FLOAT;if(a===Mx)return r.ALPHA;if(a===bx)return r.RGB;if(a===Hi)return r.RGBA;if(a===Oa)return r.DEPTH_COMPONENT;if(a===Vs)return r.DEPTH_STENCIL;if(a===Ep)return r.RED;if(a===Tp)return r.RED_INTEGER;if(a===qs)return r.RG;if(a===Ap)return r.RG_INTEGER;if(a===wp)return r.RGBA_INTEGER;if(a===mu||a===gu||a===vu||a===_u)if(u===Xe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===mu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===gu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===vu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===_u)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===mu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===gu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===vu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===_u)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Nd||a===Od||a===Pd||a===Id)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Nd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Od)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Pd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Id)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===zd||a===Bd||a===Fd||a===Hd||a===Gd||a===bu||a===Vd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===zd||a===Bd)return u===Xe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Fd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===Hd)return c.COMPRESSED_R11_EAC;if(a===Gd)return c.COMPRESSED_SIGNED_R11_EAC;if(a===bu)return c.COMPRESSED_RG11_EAC;if(a===Vd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===kd||a===Xd||a===Wd||a===qd||a===Yd||a===Zd||a===Kd||a===Jd||a===Qd||a===jd||a===$d||a===tp||a===ep||a===np)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===kd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Xd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Wd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Yd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Zd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Kd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Jd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===jd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===$d)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===tp)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===ep)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===np)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===ip||a===ap||a===sp)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===ip)return u===Xe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===ap)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===sp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===rp||a===op||a===Eu||a===lp)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===rp)return c.COMPRESSED_RED_RGTC1_EXT;if(a===op)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Eu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===lp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Ml?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const _2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,x2=`
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

}`;class S2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new Lx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new ni({vertexShader:_2,fragmentShader:x2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ge(new ks(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class y2 extends Zs{constructor(t,n){super();const a=this;let o=null,c=1,u=null,h="local-floor",m=1,d=null,v=null,_=null,g=null,x=null,b=null;const w=typeof XRWebGLBinding<"u",y=new S2,S={},C=n.getContextAttributes();let O=null,A=null;const U=[],L=[],I=new Wt;let T=null,P=null;const F=new Ri;F.viewport=new an;const W=new Ri;W.viewport=new an;const H=[F,W],$=new R1;let k=null,tt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let pt=U[st];return pt===void 0&&(pt=new td,U[st]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(st){let pt=U[st];return pt===void 0&&(pt=new td,U[st]=pt),pt.getGripSpace()},this.getHand=function(st){let pt=U[st];return pt===void 0&&(pt=new td,U[st]=pt),pt.getHandSpace()};function B(st){const pt=L.indexOf(st.inputSource);if(pt===-1)return;const Tt=U[pt];Tt!==void 0&&(Tt.update(st.inputSource,st.frame,d||u),Tt.dispatchEvent({type:st.type,data:st.inputSource}))}function X(){o.removeEventListener("select",B),o.removeEventListener("selectstart",B),o.removeEventListener("selectend",B),o.removeEventListener("squeeze",B),o.removeEventListener("squeezestart",B),o.removeEventListener("squeezeend",B),o.removeEventListener("end",X),o.removeEventListener("inputsourceschange",q);for(let st=0;st<U.length;st++){const pt=L[st];pt!==null&&(L[st]=null,U[st].disconnect(pt))}k=null,tt=null,y.reset();for(const st in S)delete S[st];if(t.setRenderTarget(O),x=null,g=null,_=null,o=null,A=null,wt.stop(),a.isPresenting=!1,t.setPixelRatio(T),t.setSize(I.width,I.height,!1),P!==null){const st=P.camera;st.fov=P.fov,st.zoom=P.zoom,st.updateProjectionMatrix(),P=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){c=st,a.isPresenting===!0&&ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){h=st,a.isPresenting===!0&&ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||u},this.setReferenceSpace=function(st){d=st},this.getBaseLayer=function(){return g!==null?g:x},this.getBinding=function(){return _===null&&w&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return b},this.getSession=function(){return o},this.setSession=async function(st){if(o=st,o!==null){if(O=t.getRenderTarget(),o.addEventListener("select",B),o.addEventListener("selectstart",B),o.addEventListener("selectend",B),o.addEventListener("squeeze",B),o.addEventListener("squeezestart",B),o.addEventListener("squeezeend",B),o.addEventListener("end",X),o.addEventListener("inputsourceschange",q),C.xrCompatible!==!0&&await n.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(I),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,It=null,At=null;C.depth&&(At=C.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Tt=C.stencil?Vs:Oa,It=C.stencil?Ml:na);const ee={colorFormat:n.RGBA8,depthFormat:At,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(ee),o.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),A=new Di(g.textureWidth,g.textureHeight,{format:Hi,type:mi,depthTexture:new Tl(g.textureWidth,g.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:C.stencil,colorSpace:t.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const Tt={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(o,n,Tt),o.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new Di(x.framebufferWidth,x.framebufferHeight,{format:Hi,type:mi,colorSpace:t.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),d=null,u=await o.requestReferenceSpace(h),wt.setContext(o),wt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function q(st){for(let pt=0;pt<st.removed.length;pt++){const Tt=st.removed[pt],It=L.indexOf(Tt);It>=0&&(L[It]=null,U[It].disconnect(Tt))}for(let pt=0;pt<st.added.length;pt++){const Tt=st.added[pt];let It=L.indexOf(Tt);if(It===-1){for(let ee=0;ee<U.length;ee++)if(ee>=L.length){L.push(Tt),It=ee;break}else if(L[ee]===null){L[ee]=Tt,It=ee;break}if(It===-1)break}const At=U[It];At&&At.connect(Tt)}}const nt=new G,rt=new G;function N(st,pt,Tt){nt.setFromMatrixPosition(pt.matrixWorld),rt.setFromMatrixPosition(Tt.matrixWorld);const It=nt.distanceTo(rt),At=pt.projectionMatrix.elements,ee=Tt.projectionMatrix.elements,Be=At[14]/(At[10]-1),ne=At[14]/(At[10]+1),me=(At[9]+1)/At[5],Ce=(At[9]-1)/At[5],ue=(At[8]-1)/At[0],we=(ee[8]+1)/ee[0],je=Be*ue,ln=Be*we,Oe=It/(-ue+we),$e=Oe*-ue;if(pt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX($e),st.translateZ(Oe),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),At[10]===-1)st.projectionMatrix.copy(pt.projectionMatrix),st.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const K=Be+Oe,De=ne+Oe,_e=je-$e,z=ln+(It-$e),E=me*ne/De*K,it=Ce*ne/De*K;st.projectionMatrix.makePerspective(_e,z,E,it,K,De),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function et(st,pt){pt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(pt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(o===null)return;let pt=st.near,Tt=st.far;y.texture!==null&&(y.depthNear>0&&(pt=y.depthNear),y.depthFar>0&&(Tt=y.depthFar)),$.near=W.near=F.near=pt,$.far=W.far=F.far=Tt,(k!==$.near||tt!==$.far)&&(o.updateRenderState({depthNear:$.near,depthFar:$.far}),k=$.near,tt=$.far),$.layers.mask=st.layers.mask|6,F.layers.mask=$.layers.mask&-5,W.layers.mask=$.layers.mask&-3;const It=st.parent,At=$.cameras;et($,It);for(let ee=0;ee<At.length;ee++)et(At[ee],It);At.length===2?N($,F,W):$.projectionMatrix.copy(F.projectionMatrix),P===null&&st.isPerspectiveCamera&&(P={camera:st,fov:st.fov,zoom:st.zoom}),Q(st,$,It)};function Q(st,pt,Tt){Tt===null?st.matrix.copy(pt.matrixWorld):(st.matrix.copy(Tt.matrixWorld),st.matrix.invert(),st.matrix.multiply(pt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(pt.projectionMatrix),st.projectionMatrixInverse.copy(pt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=El*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(g===null&&x===null))return m},this.setFoveation=function(st){m=st,g!==null&&(g.fixedFoveation=st),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=st)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh($)},this.getCameraTexture=function(st){return S[st]};let j=null;function bt(st,pt){if(v=pt.getViewerPose(d||u),b=pt,v!==null){const Tt=v.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let It=!1;Tt.length!==$.cameras.length&&($.cameras.length=0,It=!0);for(let ne=0;ne<Tt.length;ne++){const me=Tt[ne];let Ce=null;if(x!==null)Ce=x.getViewport(me);else{const we=_.getViewSubImage(g,me);Ce=we.viewport,ne===0&&(t.setRenderTargetTextures(A,we.colorTexture,we.depthStencilTexture),t.setRenderTarget(A))}let ue=H[ne];ue===void 0&&(ue=new Ri,ue.layers.enable(ne),ue.viewport=new an,H[ne]=ue),ue.matrix.fromArray(me.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(me.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),ne===0&&($.matrix.copy(ue.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),It===!0&&$.cameras.push(ue)}const At=o.enabledFeatures;if(At&&At.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&w){_=a.getBinding();const ne=_.getDepthInformation(Tt[0]);ne&&ne.isValid&&ne.texture&&y.init(ne,o.renderState)}if(At&&At.includes("camera-access")&&w){t.state.unbindTexture(),_=a.getBinding();for(let ne=0;ne<Tt.length;ne++){const me=Tt[ne].camera;if(me){let Ce=S[me];Ce||(Ce=new Lx,S[me]=Ce);const ue=_.getCameraImage(me);Ce.sourceTexture=ue}}}}for(let Tt=0;Tt<U.length;Tt++){const It=L[Tt],At=U[Tt];It!==null&&At!==void 0&&At.update(It,pt,d||u)}j&&j(st,pt),pt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:pt}),b=null}const wt=new qx;wt.setAnimationLoop(bt),this.setAnimationLoop=function(st){j=st},this.dispose=function(){}}}const M2=new Ee,$x=new oe;$x.set(-1,0,0,0,1,0,0,0,1);function b2(r,t){function n(y,S){y.matrixAutoUpdate===!0&&y.updateMatrix(),S.value.copy(y.matrix)}function a(y,S){S.color.getRGB(y.fogColor.value,kx(r)),S.isFog?(y.fogNear.value=S.near,y.fogFar.value=S.far):S.isFogExp2&&(y.fogDensity.value=S.density)}function o(y,S,C,O,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(y,S):S.isMeshLambertMaterial?(c(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(y,S),_(y,S)):S.isMeshPhongMaterial?(c(y,S),v(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(y,S),g(y,S),S.isMeshPhysicalMaterial&&x(y,S,A)):S.isMeshMatcapMaterial?(c(y,S),b(y,S)):S.isMeshDepthMaterial?c(y,S):S.isMeshDistanceMaterial?(c(y,S),w(y,S)):S.isMeshNormalMaterial?c(y,S):S.isLineBasicMaterial?(u(y,S),S.isLineDashedMaterial&&h(y,S)):S.isPointsMaterial?m(y,S,C,O):S.isSpriteMaterial?d(y,S):S.isShadowMaterial?(y.color.value.copy(S.color),y.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(y,S){y.opacity.value=S.opacity,S.color&&y.diffuse.value.copy(S.color),S.emissive&&y.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(y.map.value=S.map,n(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,n(S.alphaMap,y.alphaMapTransform)),S.bumpMap&&(y.bumpMap.value=S.bumpMap,n(S.bumpMap,y.bumpMapTransform),y.bumpScale.value=S.bumpScale,S.side===Wn&&(y.bumpScale.value*=-1)),S.normalMap&&(y.normalMap.value=S.normalMap,n(S.normalMap,y.normalMapTransform),y.normalScale.value.copy(S.normalScale),S.side===Wn&&y.normalScale.value.negate()),S.displacementMap&&(y.displacementMap.value=S.displacementMap,n(S.displacementMap,y.displacementMapTransform),y.displacementScale.value=S.displacementScale,y.displacementBias.value=S.displacementBias),S.emissiveMap&&(y.emissiveMap.value=S.emissiveMap,n(S.emissiveMap,y.emissiveMapTransform)),S.specularMap&&(y.specularMap.value=S.specularMap,n(S.specularMap,y.specularMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest);const C=t.get(S),O=C.envMap,A=C.envMapRotation;O&&(y.envMap.value=O,y.envMapRotation.value.setFromMatrix4(M2.makeRotationFromEuler(A)).transpose(),O.isCubeTexture&&O.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply($x),y.reflectivity.value=S.reflectivity,y.ior.value=S.ior,y.refractionRatio.value=S.refractionRatio),S.lightMap&&(y.lightMap.value=S.lightMap,y.lightMapIntensity.value=S.lightMapIntensity,n(S.lightMap,y.lightMapTransform)),S.aoMap&&(y.aoMap.value=S.aoMap,y.aoMapIntensity.value=S.aoMapIntensity,n(S.aoMap,y.aoMapTransform))}function u(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,S.map&&(y.map.value=S.map,n(S.map,y.mapTransform))}function h(y,S){y.dashSize.value=S.dashSize,y.totalSize.value=S.dashSize+S.gapSize,y.scale.value=S.scale}function m(y,S,C,O){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.size.value=S.size*C,y.scale.value=O*.5,S.map&&(y.map.value=S.map,n(S.map,y.uvTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,n(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function d(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.rotation.value=S.rotation,S.map&&(y.map.value=S.map,n(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,n(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function v(y,S){y.specular.value.copy(S.specular),y.shininess.value=Math.max(S.shininess,1e-4)}function _(y,S){S.gradientMap&&(y.gradientMap.value=S.gradientMap)}function g(y,S){y.metalness.value=S.metalness,S.metalnessMap&&(y.metalnessMap.value=S.metalnessMap,n(S.metalnessMap,y.metalnessMapTransform)),y.roughness.value=S.roughness,S.roughnessMap&&(y.roughnessMap.value=S.roughnessMap,n(S.roughnessMap,y.roughnessMapTransform)),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)}function x(y,S,C){y.ior.value=S.ior,S.sheen>0&&(y.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),y.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(y.sheenColorMap.value=S.sheenColorMap,n(S.sheenColorMap,y.sheenColorMapTransform)),S.sheenRoughnessMap&&(y.sheenRoughnessMap.value=S.sheenRoughnessMap,n(S.sheenRoughnessMap,y.sheenRoughnessMapTransform))),S.clearcoat>0&&(y.clearcoat.value=S.clearcoat,y.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(y.clearcoatMap.value=S.clearcoatMap,n(S.clearcoatMap,y.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,n(S.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(y.clearcoatNormalMap.value=S.clearcoatNormalMap,n(S.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Wn&&y.clearcoatNormalScale.value.negate())),S.dispersion>0&&(y.dispersion.value=S.dispersion),S.retroreflectivity>0&&(y.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(y.iridescence.value=S.iridescence,y.iridescenceIOR.value=S.iridescenceIOR,y.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(y.iridescenceMap.value=S.iridescenceMap,n(S.iridescenceMap,y.iridescenceMapTransform)),S.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=S.iridescenceThicknessMap,n(S.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),S.transmission>0&&(y.transmission.value=S.transmission,y.transmissionSamplerMap.value=C.texture,y.transmissionSamplerSize.value.set(C.width,C.height),S.transmissionMap&&(y.transmissionMap.value=S.transmissionMap,n(S.transmissionMap,y.transmissionMapTransform)),y.thickness.value=S.thickness,S.thicknessMap&&(y.thicknessMap.value=S.thicknessMap,n(S.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=S.attenuationDistance,y.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(y.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(y.anisotropyMap.value=S.anisotropyMap,n(S.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=S.specularIntensity,y.specularColor.value.copy(S.specularColor),S.specularColorMap&&(y.specularColorMap.value=S.specularColorMap,n(S.specularColorMap,y.specularColorMapTransform)),S.specularIntensityMap&&(y.specularIntensityMap.value=S.specularIntensityMap,n(S.specularIntensityMap,y.specularIntensityMapTransform))}function b(y,S){S.matcap&&(y.matcap.value=S.matcap)}function w(y,S){const C=t.get(S).light;y.referencePosition.value.setFromMatrixPosition(C.matrixWorld),y.nearDistance.value=C.shadow.camera.near,y.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function E2(r,t,n,a){let o={},c={},u=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,U){const L=U.program;a.uniformBlockBinding(A,L)}function d(A,U){let L=o[A.id];L===void 0&&(y(A),L=v(A),o[A.id]=L,A.addEventListener("dispose",C));const I=U.program;a.updateUBOMapping(A,I);const T=t.render.frame;c[A.id]!==T&&(g(A),c[A.id]=T)}function v(A){const U=_();A.__bindingPointIndex=U;const L=r.createBuffer(),I=A.__size,T=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,L),r.bufferData(r.UNIFORM_BUFFER,I,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,L),L}function _(){for(let A=0;A<h;A++)if(u.indexOf(A)===-1)return u.push(A),A;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(A){const U=o[A.id],L=A.uniforms,I=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let T=0,P=L.length;T<P;T++){const F=L[T];if(Array.isArray(F))for(let W=0,H=F.length;W<H;W++)x(F[W],T,W,I);else x(F,T,0,I)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,U,L,I){if(w(A,U,L,I)===!0){const T=A.__offset,P=A.value;if(Array.isArray(P)){let F=0;for(let W=0;W<P.length;W++){const H=P[W],$=S(H);b(H,A.__data,F),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(F+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(P,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,T,A.__data)}}function b(A,U,L){typeof A=="number"||typeof A=="boolean"?U[0]=A:A.isMatrix3?(U[0]=A.elements[0],U[1]=A.elements[1],U[2]=A.elements[2],U[3]=0,U[4]=A.elements[3],U[5]=A.elements[4],U[6]=A.elements[5],U[7]=0,U[8]=A.elements[6],U[9]=A.elements[7],U[10]=A.elements[8],U[11]=0):ArrayBuffer.isView(A)?U.set(new A.constructor(A.buffer,A.byteOffset,U.length)):A.toArray(U,L)}function w(A,U,L,I){const T=A.value,P=U+"_"+L;if(I[P]===void 0)return typeof T=="number"||typeof T=="boolean"?I[P]=T:ArrayBuffer.isView(T)?I[P]=T.slice():I[P]=T.clone(),!0;{const F=I[P];if(typeof T=="number"||typeof T=="boolean"){if(F!==T)return I[P]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(F.equals(T)===!1)return F.copy(T),!0}}return!1}function y(A){const U=A.uniforms;let L=0;const I=16;for(let P=0,F=U.length;P<F;P++){const W=Array.isArray(U[P])?U[P]:[U[P]];for(let H=0,$=W.length;H<$;H++){const k=W[H],tt=Array.isArray(k.value)?k.value:[k.value];for(let B=0,X=tt.length;B<X;B++){const q=tt[B],nt=S(q),rt=L%I,N=rt%nt.boundary,et=rt+N;L+=N,et!==0&&I-et<nt.storage&&(L+=I-et),k.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=L,L+=nt.storage}}}const T=L%I;return T>0&&(L+=I-T),A.__size=L,A.__cache={},this}function S(A){const U={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(U.boundary=4,U.storage=4):A.isVector2?(U.boundary=8,U.storage=8):A.isVector3||A.isColor?(U.boundary=16,U.storage=12):A.isVector4?(U.boundary=16,U.storage=16):A.isMatrix3?(U.boundary=48,U.storage=48):A.isMatrix4?(U.boundary=64,U.storage=64):A.isTexture?ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(U.boundary=16,U.storage=A.byteLength):ae("WebGLRenderer: Unsupported uniform value type.",A),U}function C(A){const U=A.target;U.removeEventListener("dispose",C);const L=u.indexOf(U.__bindingPointIndex);u.splice(L,1),r.deleteBuffer(o[U.id]),delete o[U.id],delete c[U.id]}function O(){for(const A in o)r.deleteBuffer(o[A]);u=[],o={},c={}}return{bind:m,update:d,dispose:O}}const T2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qi=null;function A2(){return Qi===null&&(Qi=new Dx(T2,16,16,qs,ki),Qi.name="DFG_LUT",Qi.minFilter=Fn,Qi.magFilter=Fn,Qi.wrapS=Da,Qi.wrapT=Da,Qi.generateMipmaps=!1,Qi.needsUpdate=!0),Qi}class w2{constructor(t={}){const{canvas:n=JM(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:x=mi}=t;this.isWebGLRenderer=!0;let b;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=a.getContextAttributes().alpha}else b=u;const w=x,y=new Set([wp,Ap,Tp]),S=new Set([mi,na,yl,Ml,Mp,bp]),C=new Uint32Array(4),O=new Int32Array(4),A=new G;let U=null,L=null;const I=[],T=[];let P=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ea,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let W=!1,H=null,$=null,k=null,tt=null;this._outputColorSpace=ti;let B=0,X=0,q=null,nt=-1,rt=null;const N=new an,et=new an;let Q=null;const j=new te(0);let bt=0,wt=n.width,st=n.height,pt=1,Tt=null,It=null;const At=new an(0,0,wt,st),ee=new an(0,0,wt,st);let Be=!1;const ne=new Ip;let me=!1,Ce=!1;const ue=new Ee,we=new G,je=new an,ln={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function $e(){return q===null?pt:1}let K=a;function De(R,Y){return n.getContext(R,Y)}let _e,z,E,it,ot,vt,Rt,Ut,gt,_t,Ct,Vt,Pt,Nt,Qt,jt,se,J,Dt,St,Lt,Ft,Et;try{const R={alpha:!0,depth:o,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${xp}`),n.addEventListener("webglcontextlost",We,!1),n.addEventListener("webglcontextrestored",Ue,!1),n.addEventListener("webglcontextcreationerror",qn,!1),K===null){const Y="webgl2";if(K=De(Y,R),K===null)throw De(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Jt()}catch(R){throw n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",qn,!1),Ne("WebGLRenderer: "+R.message),R}function Jt(){_e=new AA(K),_e.init(),Lt=new v2(K,_e),z=new gA(K,_e,t,Lt),E=new m2(K,_e),z.reversedDepthBuffer&&g&&E.buffers.depth.setReversed(!0),$=K.createFramebuffer(),k=K.createFramebuffer(),tt=K.createFramebuffer(),it=new CA(K),ot=new e2,vt=new g2(K,_e,E,ot,z,Lt,it),Rt=new TA(F),Ut=new U1(K),Ft=new pA(K,Ut),gt=new wA(K,Ut,it,Ft),_t=new UA(K,gt,Ut,Ft,it),J=new DA(K,z,vt),Qt=new vA(ot),Ct=new t2(F,Rt,_e,z,Ft,Qt),Vt=new b2(F,ot),Pt=new i2,Nt=new c2(_e),se=new dA(F,Rt,E,_t,b,m),jt=new p2(F,_t,z),Et=new E2(K,it,z,E),Dt=new mA(K,_e,it),St=new RA(K,_e,it),it.programs=Ct.programs,F.capabilities=z,F.extensions=_e,F.properties=ot,F.renderLists=Pt,F.shadowMap=jt,F.state=E,F.info=it}w!==mi&&(P=new NA(w,n.width,n.height,h,o,c));const qt=new y2(F,K);this.xr=qt,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const R=_e.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=_e.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return pt},this.setPixelRatio=function(R){R!==void 0&&(pt=R,this.setSize(wt,st,!1))},this.getSize=function(R){return R.set(wt,st)},this.setSize=function(R,Y,dt=!0){if(qt.isPresenting){ae("WebGLRenderer: Can't change size while VR device is presenting.");return}wt=R,st=Y,n.width=Math.floor(R*pt),n.height=Math.floor(Y*pt),dt===!0&&(n.style.width=R+"px",n.style.height=Y+"px"),P!==null&&P.setSize(n.width,n.height),this.setViewport(0,0,R,Y)},this.getDrawingBufferSize=function(R){return R.set(wt*pt,st*pt).floor()},this.setDrawingBufferSize=function(R,Y,dt){wt=R,st=Y,pt=dt,n.width=Math.floor(R*dt),n.height=Math.floor(Y*dt),this.setViewport(0,0,R,Y)},this.setEffects=function(R){if(w===mi){Ne("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let Y=0;Y<R.length;Y++)if(R[Y].isOutputPass===!0){ae("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(N)},this.getViewport=function(R){return R.copy(At)},this.setViewport=function(R,Y,dt,lt){R.isVector4?At.set(R.x,R.y,R.z,R.w):At.set(R,Y,dt,lt),E.viewport(N.copy(At).multiplyScalar(pt).round())},this.getScissor=function(R){return R.copy(ee)},this.setScissor=function(R,Y,dt,lt){R.isVector4?ee.set(R.x,R.y,R.z,R.w):ee.set(R,Y,dt,lt),E.scissor(et.copy(ee).multiplyScalar(pt).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(R){E.setScissorTest(Be=R)},this.setOpaqueSort=function(R){Tt=R},this.setTransparentSort=function(R){It=R},this.getClearColor=function(R){return R.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(R=!0,Y=!0,dt=!0){let lt=0;if(R){let ct=!1;if(q!==null){const zt=q.texture.format;ct=y.has(zt)}if(ct){const zt=q.texture.type,kt=S.has(zt),Ot=se.getClearColor(),Ht=se.getClearAlpha(),Gt=Ot.r,le=Ot.g,ge=Ot.b;kt?(C[0]=Gt,C[1]=le,C[2]=ge,C[3]=Ht,K.clearBufferuiv(K.COLOR,0,C)):(O[0]=Gt,O[1]=le,O[2]=ge,O[3]=Ht,K.clearBufferiv(K.COLOR,0,O))}else lt|=K.COLOR_BUFFER_BIT}Y&&(lt|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),dt&&(lt|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),lt!==0&&K.clear(lt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),H=R},this.dispose=function(){n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",qn,!1),se.dispose(),Pt.dispose(),Nt.dispose(),ot.dispose(),Rt.dispose(),_t.dispose(),Ft.dispose(),Et.dispose(),Ct.dispose(),qt.dispose(),qt.removeEventListener("sessionstart",pn),qt.removeEventListener("sessionend",Cn),Yn.stop()};function We(R){R.preventDefault(),Wv("WebGLRenderer: Context Lost."),W=!0}function Ue(){Wv("WebGLRenderer: Context Restored."),W=!1;const R=it.autoReset,Y=jt.enabled,dt=jt.autoUpdate,lt=jt.needsUpdate,ct=jt.type;Jt(),it.autoReset=R,jt.enabled=Y,jt.autoUpdate=dt,jt.needsUpdate=lt,jt.type=ct}function qn(R){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ii(R){const Y=R.target;Y.removeEventListener("dispose",ii),so(Y)}function so(R){ro(R),ot.remove(R)}function ro(R){const Y=ot.get(R).programs;Y!==void 0&&(Y.forEach(function(dt){Ct.releaseProgram(dt)}),R.isShaderMaterial&&Ct.releaseShaderCache(R))}this.renderBufferDirect=function(R,Y,dt,lt,ct,zt){Y===null&&(Y=ln);const kt=ct.isMesh&&ct.matrixWorld.determinantAffine()<0,Ot=za(R,Y,dt,lt,ct);E.setMaterial(lt,kt);let Ht=dt.index,Gt=1;if(lt.wireframe===!0){if(Ht=gt.getWireframeAttribute(dt),Ht===void 0)return;Gt=2}const le=dt.drawRange,ge=dt.attributes.position;let Yt=le.start*Gt,Le=(le.start+le.count)*Gt;zt!==null&&(Yt=Math.max(Yt,zt.start*Gt),Le=Math.min(Le,(zt.start+zt.count)*Gt)),Ht!==null?(Yt=Math.max(Yt,0),Le=Math.min(Le,Ht.count)):ge!=null&&(Yt=Math.max(Yt,0),Le=Math.min(Le,ge.count));const tn=Le-Yt;if(tn<0||tn===1/0)return;Ft.setup(ct,lt,Ot,dt,Ht);let Je,he=Dt;if(Ht!==null&&(Je=Ut.get(Ht),he=St,he.setIndex(Je)),ct.isMesh)lt.wireframe===!0?(E.setLineWidth(lt.wireframeLinewidth*$e()),he.setMode(K.LINES)):he.setMode(K.TRIANGLES);else if(ct.isLine){let gn=lt.linewidth;gn===void 0&&(gn=1),E.setLineWidth(gn*$e()),ct.isLineSegments?he.setMode(K.LINES):ct.isLineLoop?he.setMode(K.LINE_LOOP):he.setMode(K.LINE_STRIP)}else ct.isPoints?he.setMode(K.POINTS):ct.isSprite&&he.setMode(K.TRIANGLES);if(ct.isBatchedMesh)if(_e.get("WEBGL_multi_draw"))he.renderMultiDraw(ct._multiDrawStarts,ct._multiDrawCounts,ct._multiDrawCount);else{const gn=ct._multiDrawStarts,Xt=ct._multiDrawCounts,bn=ct._multiDrawCount,de=Ht?Ut.get(Ht).bytesPerElement:1,Hn=ot.get(lt).currentProgram.getUniforms();for(let ai=0;ai<bn;ai++)Hn.setValue(K,"_gl_DrawID",ai),he.render(gn[ai]/de,Xt[ai])}else if(ct.isInstancedMesh)he.renderInstances(Yt,tn,ct.count);else if(dt.isInstancedBufferGeometry){const gn=dt._maxInstanceCount!==void 0?dt._maxInstanceCount:1/0,Xt=Math.min(dt.instanceCount,gn);he.renderInstances(Yt,tn,Xt)}else he.render(Yt,tn)};function oo(R,Y,dt,lt){H!==null&&R.isNodeMaterial&&H.setObject(lt,R),me===!0&&Qt.setState(R,dt,!1),R.transparent===!0&&R.side===ei&&R.forceSinglePass===!1?(R.side=Wn,R.needsUpdate=!0,Ia(R,Y,lt),R.side=Xs,R.needsUpdate=!0,Ia(R,Y,lt),R.side=ei):Ia(R,Y,lt)}this.compile=function(R,Y,dt=null){dt===null&&(dt=R),H!==null&&H.renderStart(R,Y,dt),L=Nt.get(dt),L.init(Y),T.push(L),dt.traverseVisible(function(ct){ct.isLight&&ct.layers.test(Y.layers)&&(L.pushLight(ct),ct.castShadow&&L.pushShadow(ct))}),R!==dt&&R.traverseVisible(function(ct){ct.isLight&&ct.layers.test(Y.layers)&&(L.pushLight(ct),ct.castShadow&&L.pushShadow(ct))}),L.setupLights(),H!==null&&H.updateLights(L.state.lightsArray),Ce=this.localClippingEnabled,me=Qt.init(this.clippingPlanes,Ce),me===!0&&Qt.setGlobalState(this.clippingPlanes,Y),H!==null&&jt.render(L.state.shadowsArray,dt,Y);const lt=new Set;return R.traverse(function(ct){if(!(ct.isMesh||ct.isPoints||ct.isLine||ct.isSprite))return;const zt=ct.material;if(zt)if(Array.isArray(zt))for(let kt=0;kt<zt.length;kt++){const Ot=zt[kt];oo(Ot,dt,Y,ct),lt.add(Ot)}else oo(zt,dt,Y,ct),lt.add(zt)}),L=T.pop(),H!==null&&H.renderEnd(),lt},this.compileAsync=function(R,Y,dt=null){const lt=this.compile(R,Y,dt);return new Promise(ct=>{function zt(){if(lt.forEach(function(kt){const Ht=ot.get(kt).currentProgram;(Ht===void 0||Ht.isReady())&&lt.delete(kt)}),lt.size===0){ct(R);return}setTimeout(zt,10)}_e.get("KHR_parallel_shader_compile")!==null?zt():setTimeout(zt,10)})};let Qs=null;function Xi(R){Qs&&Qs(R)}function pn(){Yn.stop()}function Cn(){Yn.start()}const Yn=new qx;Yn.setAnimationLoop(Xi),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(R){Qs=R,qt.setAnimationLoop(R),R===null?Yn.stop():Yn.start()},qt.addEventListener("sessionstart",pn),qt.addEventListener("sessionend",Cn),this.render=function(R,Y){if(Y!==void 0&&Y.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;H!==null&&H.renderStart(R,Y);const dt=qt.enabled===!0&&qt.isPresenting===!0,lt=P!==null&&(q===null||dt)&&P.begin(F,q);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),qt.enabled===!0&&qt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(qt.cameraAutoUpdate===!0&&qt.updateCamera(Y),Y=qt.getCamera()),R.isScene===!0&&R.onBeforeRender(F,R,Y,q),L=Nt.get(R,T.length),L.init(Y),L.state.textureUnits=vt.getTextureUnits(),T.push(L),ue.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),ne.setFromProjectionMatrix(ue,ta,Y.reversedDepth),Ce=this.localClippingEnabled,me=Qt.init(this.clippingPlanes,Ce),U=Pt.get(R,I.length),U.init(),I.push(U),qt.enabled===!0&&qt.isPresenting===!0){const kt=F.xr.getDepthSensingMesh();kt!==null&&vs(kt,Y,-1/0,F.sortObjects)}vs(R,Y,0,F.sortObjects),U.finish(),H!==null&&H.updateLights(L.state.lightsArray),F.sortObjects===!0&&U.sort(Tt,It),Oe=qt.enabled===!1||qt.isPresenting===!1||qt.hasDepthSensing()===!1,Oe&&se.addToRenderList(U,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),me===!0&&Qt.beginShadows();const ct=L.state.shadowsArray;if(jt.render(ct,R,Y),me===!0&&Qt.endShadows(),(lt&&P.hasRenderPass())===!1){const kt=U.opaque,Ot=U.transmissive;if(L.setupLights(),Y.isArrayCamera){const Ht=Y.cameras;if(Ot.length>0)for(let Gt=0,le=Ht.length;Gt<le;Gt++){const ge=Ht[Gt];Ul(kt,Ot,R,ge)}Oe&&se.render(R);for(let Gt=0,le=Ht.length;Gt<le;Gt++){const ge=Ht[Gt];Dl(U,R,ge,ge.viewport)}}else Ot.length>0&&Ul(kt,Ot,R,Y),Oe&&se.render(R),Dl(U,R,Y)}q!==null&&X===0&&(vt.updateMultisampleRenderTarget(q),vt.updateRenderTargetMipmap(q)),lt&&P.end(F),R.isScene===!0&&R.onAfterRender(F,R,Y),Ft.resetDefaultState(),nt=-1,rt=null,T.pop(),T.length>0?(L=T[T.length-1],vt.setTextureUnits(L.state.textureUnits),me===!0&&Qt.setGlobalState(F.clippingPlanes,L.state.camera)):L=null,I.pop(),I.length>0?U=I[I.length-1]:U=null,H!==null&&H.renderEnd()};function vs(R,Y,dt,lt){if(R.visible===!1)return;if(R.layers.test(Y.layers)){if(R.isGroup)dt=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Y);else if(R.isLightProbeGrid)L.pushLightProbeGrid(R);else if(R.isLight)L.pushLight(R),R.castShadow&&L.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(ne)){lt&&je.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ue);const kt=_t.update(R),Ot=R.material;Ot.visible&&U.push(R,kt,Ot,dt,je.z,null,Y)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(ne))){const kt=_t.update(R),Ot=R.material;if(lt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),je.copy(R.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),je.copy(kt.boundingSphere.center)),je.applyMatrix4(R.matrixWorld).applyMatrix4(ue)),Array.isArray(Ot)){const Ht=kt.groups;for(let Gt=0,le=Ht.length;Gt<le;Gt++){const ge=Ht[Gt],Yt=Ot[ge.materialIndex];Yt&&Yt.visible&&U.push(R,kt,Yt,dt,je.z,ge,Y)}}else Ot.visible&&U.push(R,kt,Ot,dt,je.z,null,Y)}}const zt=R.children;for(let kt=0,Ot=zt.length;kt<Ot;kt++)vs(zt[kt],Y,dt,lt)}function Dl(R,Y,dt,lt){const{opaque:ct,transmissive:zt,transparent:kt}=R;L.setupLightsView(dt),me===!0&&Qt.setGlobalState(F.clippingPlanes,dt),lt&&E.viewport(N.copy(lt)),ct.length>0&&_s(ct,Y,dt),zt.length>0&&_s(zt,Y,dt),kt.length>0&&_s(kt,Y,dt),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function Ul(R,Y,dt,lt){if((dt.isScene===!0?dt.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[lt.id]===void 0){const Yt=_e.has("EXT_color_buffer_half_float")||_e.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[lt.id]=new Di(1,1,{generateMipmaps:!0,type:Yt?ki:mi,minFilter:Gs,samples:Math.max(4,z.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ae.workingColorSpace})}const zt=L.state.transmissionRenderTarget[lt.id],kt=lt.viewport||N;zt.setSize(kt.z*F.transmissionResolutionScale,kt.w*F.transmissionResolutionScale);const Ot=F.getRenderTarget(),Ht=F.getActiveCubeFace(),Gt=F.getActiveMipmapLevel();F.setRenderTarget(zt),F.getClearColor(j),bt=F.getClearAlpha(),bt<1&&F.setClearColor(16777215,.5),F.clear(),Oe&&se.render(dt);const le=F.toneMapping;F.toneMapping=ea;const ge=lt.viewport;if(lt.viewport!==void 0&&(lt.viewport=void 0),L.setupLightsView(lt),me===!0&&Qt.setGlobalState(F.clippingPlanes,lt),_s(R,dt,lt),vt.updateMultisampleRenderTarget(zt),vt.updateRenderTargetMipmap(zt),_e.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let Le=0,tn=Y.length;Le<tn;Le++){const Je=Y[Le],{object:he,geometry:gn,material:Xt,group:bn}=Je;if(Xt.side===ei&&he.layers.test(lt.layers)){const de=Xt.side;Xt.side=Wn,Xt.needsUpdate=!0,Pa(he,dt,lt,gn,Xt,bn),Xt.side=de,Xt.needsUpdate=!0,Yt=!0}}Yt===!0&&(vt.updateMultisampleRenderTarget(zt),vt.updateRenderTargetMipmap(zt))}F.setRenderTarget(Ot,Ht,Gt),F.setClearColor(j,bt),ge!==void 0&&(lt.viewport=ge),F.toneMapping=le}function _s(R,Y,dt){const lt=Y.isScene===!0?Y.overrideMaterial:null;for(let ct=0,zt=R.length;ct<zt;ct++){const kt=R[ct],{object:Ot,geometry:Ht,group:Gt}=kt;let le=kt.material;le.allowOverride===!0&&lt!==null&&(le=lt),Ot.layers.test(dt.layers)&&Pa(Ot,Y,dt,Ht,le,Gt)}}function Pa(R,Y,dt,lt,ct,zt){H!==null&&ct.isNodeMaterial&&H.setObject(R,ct),R.onBeforeRender(F,Y,dt,lt,ct,zt),R.modelViewMatrix.multiplyMatrices(dt.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ct.onBeforeRender(F,Y,dt,lt,R,zt),ct.transparent===!0&&ct.side===ei&&ct.forceSinglePass===!1?(ct.side=Wn,ct.needsUpdate=!0,F.renderBufferDirect(dt,Y,lt,ct,R,zt),ct.side=Xs,ct.needsUpdate=!0,F.renderBufferDirect(dt,Y,lt,ct,R,zt),ct.side=ei):F.renderBufferDirect(dt,Y,lt,ct,R,zt),R.onAfterRender(F,Y,dt,lt,ct,zt)}function Ia(R,Y,dt){Y.isScene!==!0&&(Y=ln);const lt=ot.get(R),ct=L.state.lights,zt=L.state.shadowsArray,kt=ct.state.version,Ot=Ct.getParameters(R,ct.state,zt,Y,dt,L.state.lightProbeGridArray),Ht=Ct.getProgramCacheKey(Ot);let Gt=lt.programs;lt.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?Y.environment:null,lt.fog=Y.fog;const le=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;lt.envMap=Rt.get(R.envMap||lt.environment,le),lt.envMapRotation=lt.environment!==null&&R.envMap===null?Y.environmentRotation:R.envMapRotation,Gt===void 0&&(R.addEventListener("dispose",ii),Gt=new Map,lt.programs=Gt);let ge=Gt.get(Ht);if(ge!==void 0){if(lt.currentProgram===ge&&lt.lightsStateVersion===kt)return ra(R,Ot),ge}else Ot.uniforms=Ct.getUniforms(R),H!==null&&R.isNodeMaterial&&H.build(R,dt,Ot),R.onBeforeCompile(Ot,F),ge=Ct.acquireProgram(Ot,Ht),Gt.set(Ht,ge),lt.uniforms=Ot.uniforms;const Yt=lt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Yt.clippingPlanes=Qt.uniform),ra(R,Ot),lt.needsLights=Ll(R),lt.lightsStateVersion=kt,lt.needsLights&&(Yt.ambientLightColor.value=ct.state.ambient,Yt.lightProbe.value=ct.state.probe,Yt.sunLights.value=ct.state.sun,Yt.sunLightShadows.value=ct.state.sunShadow,Yt.directionalLights.value=ct.state.directional,Yt.directionalLightShadows.value=ct.state.directionalShadow,Yt.spotLights.value=ct.state.spot,Yt.spotLightShadows.value=ct.state.spotShadow,Yt.rectAreaLights.value=ct.state.rectArea,Yt.ltc_1.value=ct.state.rectAreaLTC1,Yt.ltc_2.value=ct.state.rectAreaLTC2,Yt.pointLights.value=ct.state.point,Yt.pointLightShadows.value=ct.state.pointShadow,Yt.hemisphereLights.value=ct.state.hemi,Yt.sunShadowMatrix.value=ct.state.sunShadowMatrix,Yt.sunShadowCascade.value=ct.state.sunShadowCascade,Yt.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,Yt.spotLightMatrix.value=ct.state.spotLightMatrix,Yt.spotLightMap.value=ct.state.spotLightMap,Yt.pointShadowMatrix.value=ct.state.pointShadowMatrix),lt.lightProbeGrid=L.state.lightProbeGridArray.length>0,lt.currentProgram=ge,lt.uniformsList=null,ge}function sa(R){if(R.uniformsList===null){const Y=R.currentProgram.getUniforms();R.uniformsList=xu.seqWithValue(Y.seq,R.uniforms)}return R.uniformsList}function ra(R,Y){const dt=ot.get(R);dt.outputColorSpace=Y.outputColorSpace,dt.batching=Y.batching,dt.batchingColor=Y.batchingColor,dt.instancing=Y.instancing,dt.instancingColor=Y.instancingColor,dt.instancingMorph=Y.instancingMorph,dt.skinning=Y.skinning,dt.morphTargets=Y.morphTargets,dt.morphNormals=Y.morphNormals,dt.morphColors=Y.morphColors,dt.morphTargetsCount=Y.morphTargetsCount,dt.numClippingPlanes=Y.numClippingPlanes,dt.numIntersection=Y.numClipIntersection,dt.vertexAlphas=Y.vertexAlphas,dt.vertexTangents=Y.vertexTangents,dt.toneMapping=Y.toneMapping}function xs(R,Y){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;A.setFromMatrixPosition(Y.matrixWorld);for(let dt=0,lt=R.length;dt<lt;dt++){const ct=R[dt];if(ct.texture!==null&&ct.boundingBox.containsPoint(A))return ct}return null}function za(R,Y,dt,lt,ct){Y.isScene!==!0&&(Y=ln),vt.resetTextureUnits();const zt=Y.fog,kt=lt.isMeshStandardMaterial||lt.isMeshLambertMaterial||lt.isMeshPhongMaterial?Y.environment:null,Ot=q===null?F.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ae.workingColorSpace,Ht=lt.isMeshStandardMaterial||lt.isMeshLambertMaterial&&!lt.envMap||lt.isMeshPhongMaterial&&!lt.envMap,Gt=Rt.get(lt.envMap||kt,Ht),le=lt.vertexColors===!0&&!!dt.attributes.color&&dt.attributes.color.itemSize===4,ge=!!dt.attributes.tangent&&(!!lt.normalMap||lt.anisotropy>0),Yt=!!dt.morphAttributes.position,Le=!!dt.morphAttributes.normal,tn=!!dt.morphAttributes.color;let Je=ea;lt.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Je=F.toneMapping);const he=dt.morphAttributes.position||dt.morphAttributes.normal||dt.morphAttributes.color,gn=he!==void 0?he.length:0,Xt=ot.get(lt),bn=L.state.lights;if(me===!0&&(Ce===!0||R!==rt)){const qe=R===rt&&lt.id===nt;Qt.setState(lt,R,qe)}let de=!1;lt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==bn.state.version||Xt.outputColorSpace!==Ot||ct.isBatchedMesh&&Xt.batching===!1||!ct.isBatchedMesh&&Xt.batching===!0||ct.isBatchedMesh&&Xt.batchingColor===!0&&ct._colorsTexture===null||ct.isBatchedMesh&&Xt.batchingColor===!1&&ct._colorsTexture!==null||ct.isInstancedMesh&&Xt.instancing===!1||!ct.isInstancedMesh&&Xt.instancing===!0||ct.isSkinnedMesh&&Xt.skinning===!1||!ct.isSkinnedMesh&&Xt.skinning===!0||ct.isInstancedMesh&&Xt.instancingColor===!0&&ct.instanceColor===null||ct.isInstancedMesh&&Xt.instancingColor===!1&&ct.instanceColor!==null||ct.isInstancedMesh&&Xt.instancingMorph===!0&&ct.morphTexture===null||ct.isInstancedMesh&&Xt.instancingMorph===!1&&ct.morphTexture!==null||Xt.envMap!==Gt||lt.fog===!0&&Xt.fog!==zt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==Qt.numPlanes||Xt.numIntersection!==Qt.numIntersection)||Xt.vertexAlphas!==le||Xt.vertexTangents!==ge||Xt.morphTargets!==Yt||Xt.morphNormals!==Le||Xt.morphColors!==tn||Xt.toneMapping!==Je||Xt.morphTargetsCount!==gn||!!Xt.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(de=!0):(de=!0,Xt.__version=lt.version);let Hn=Xt.currentProgram;de===!0&&(Hn=Ia(lt,Y,ct),H&&lt.isNodeMaterial&&H.onUpdateProgram(lt,Hn,Xt));let ai=!1,Gn=!1,Ba=!1;const Fe=Hn.getUniforms(),sn=Xt.uniforms;if(E.useProgram(Hn.program)&&(ai=!0,Gn=!0,Ba=!0),lt.id!==nt&&(nt=lt.id,Gn=!0),Xt.needsLights){const qe=xs(L.state.lightProbeGridArray,ct);Xt.lightProbeGrid!==qe&&(Xt.lightProbeGrid=qe,Gn=!0)}if(ai||rt!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Fe.setValue(K,"projectionMatrix",R.projectionMatrix),Fe.setValue(K,"viewMatrix",R.matrixWorldInverse);const Wi=Fe.map.cameraPosition;Wi!==void 0&&Wi.setValue(K,we.setFromMatrixPosition(R.matrixWorld)),z.logarithmicDepthBuffer&&Fe.setValue(K,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(lt.isMeshPhongMaterial||lt.isMeshToonMaterial||lt.isMeshLambertMaterial||lt.isMeshBasicMaterial||lt.isMeshStandardMaterial||lt.isShaderMaterial)&&Fe.setValue(K,"isOrthographic",R.isOrthographicCamera===!0),rt!==R&&(rt=R,Gn=!0,Ba=!0)}if(Xt.needsLights&&(bn.state.sunShadowMap.length>0&&Fe.setValue(K,"sunShadowMap",bn.state.sunShadowMap,vt),bn.state.directionalShadowMap.length>0&&Fe.setValue(K,"directionalShadowMap",bn.state.directionalShadowMap,vt),bn.state.spotShadowMap.length>0&&Fe.setValue(K,"spotShadowMap",bn.state.spotShadowMap,vt),bn.state.pointShadowMap.length>0&&Fe.setValue(K,"pointShadowMap",bn.state.pointShadowMap,vt)),ct.isSkinnedMesh){Fe.setOptional(K,ct,"bindMatrix"),Fe.setOptional(K,ct,"bindMatrixInverse");const qe=ct.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),Fe.setValue(K,"boneTexture",qe.boneTexture,vt))}ct.isBatchedMesh&&(Fe.setOptional(K,ct,"batchingTexture"),Fe.setValue(K,"batchingTexture",ct._matricesTexture,vt),Fe.setOptional(K,ct,"batchingIdTexture"),Fe.setValue(K,"batchingIdTexture",ct._indirectTexture,vt),Fe.setOptional(K,ct,"batchingColorTexture"),ct._colorsTexture!==null&&Fe.setValue(K,"batchingColorTexture",ct._colorsTexture,vt));const gi=dt.morphAttributes;if((gi.position!==void 0||gi.normal!==void 0||gi.color!==void 0)&&J.update(ct,dt,Hn),(Gn||Xt.receiveShadow!==ct.receiveShadow)&&(Xt.receiveShadow=ct.receiveShadow,Fe.setValue(K,"receiveShadow",ct.receiveShadow)),(lt.isMeshStandardMaterial||lt.isMeshLambertMaterial||lt.isMeshPhongMaterial)&&lt.envMap===null&&Y.environment!==null&&(sn.envMapIntensity.value=Y.environmentIntensity),sn.dfgLUT!==void 0&&(sn.dfgLUT.value=A2()),Gn){if(Fe.setValue(K,"toneMappingExposure",F.toneMappingExposure),Xt.needsLights&&mn(sn,Ba),zt&&lt.fog===!0&&Vt.refreshFogUniforms(sn,zt),Vt.refreshMaterialUniforms(sn,lt,pt,st,L.state.transmissionRenderTarget[R.id]),Xt.needsLights&&Xt.lightProbeGrid){const qe=Xt.lightProbeGrid;sn.probesSH.value=qe.texture,sn.probesMin.value.copy(qe.boundingBox.min),sn.probesMax.value.copy(qe.boundingBox.max),sn.probesResolution.value.copy(qe.resolution)}xu.upload(K,sa(Xt),sn,vt)}if(lt.isShaderMaterial&&lt.uniformsNeedUpdate===!0&&(xu.upload(K,sa(Xt),sn,vt),lt.uniformsNeedUpdate=!1),lt.isSpriteMaterial&&Fe.setValue(K,"center",ct.center),Fe.setValue(K,"modelViewMatrix",ct.modelViewMatrix),Fe.setValue(K,"normalMatrix",ct.normalMatrix),Fe.setValue(K,"modelMatrix",ct.matrixWorld),lt.uniformsGroups!==void 0){const qe=lt.uniformsGroups;for(let Wi=0,Ui=qe.length;Wi<Ui;Wi++){const vi=qe[Wi];Et.update(vi,Hn),Et.bind(vi,Hn)}}return Hn}function mn(R,Y){R.ambientLightColor.needsUpdate=Y,R.lightProbe.needsUpdate=Y,R.sunLights.needsUpdate=Y,R.sunLightShadows.needsUpdate=Y,R.directionalLights.needsUpdate=Y,R.directionalLightShadows.needsUpdate=Y,R.pointLights.needsUpdate=Y,R.pointLightShadows.needsUpdate=Y,R.spotLights.needsUpdate=Y,R.spotLightShadows.needsUpdate=Y,R.rectAreaLights.needsUpdate=Y,R.hemisphereLights.needsUpdate=Y}function Ll(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(R,Y,dt){const lt=ot.get(R);lt.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,lt.__autoAllocateDepthBuffer===!1&&(lt.__useRenderToTexture=!1),ot.get(R.texture).__webglTexture=Y,ot.get(R.depthTexture).__webglTexture=lt.__autoAllocateDepthBuffer?void 0:dt,lt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,Y){const dt=ot.get(R);dt.__webglFramebuffer=Y,dt.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(R,Y=0,dt=0){q=R,B=Y,X=dt;let lt=null,ct=!1,zt=!1;if(R){const Ot=ot.get(R);if(Ot.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(K.FRAMEBUFFER,Ot.__webglFramebuffer),N.copy(R.viewport),et.copy(R.scissor),Q=R.scissorTest,E.viewport(N),E.scissor(et),E.setScissorTest(Q),nt=-1;return}else if(Ot.__webglFramebuffer===void 0)vt.setupRenderTarget(R);else if(Ot.__hasExternalTextures)vt.rebindTextures(R,ot.get(R.texture).__webglTexture,ot.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const le=R.depthTexture;if(Ot.__boundDepthTexture!==le){if(le!==null&&ot.has(le)&&(R.width!==le.image.width||R.height!==le.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");vt.setupDepthRenderbuffer(R)}}const Ht=R.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(zt=!0);const Gt=ot.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Gt[Y])?lt=Gt[Y][dt]:lt=Gt[Y],ct=!0):R.samples>0&&vt.useMultisampledRTT(R)===!1?lt=ot.get(R).__webglMultisampledFramebuffer:Array.isArray(Gt)?lt=Gt[dt]:lt=Gt,N.copy(R.viewport),et.copy(R.scissor),Q=R.scissorTest}else N.copy(At).multiplyScalar(pt).floor(),et.copy(ee).multiplyScalar(pt).floor(),Q=Be;if(dt!==0&&(lt=$),E.bindFramebuffer(K.FRAMEBUFFER,lt)&&E.drawBuffers(R,lt),E.viewport(N),E.scissor(et),E.setScissorTest(Q),ct){const Ot=ot.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ot.__webglTexture,dt)}else if(zt){const Ot=Y;for(let Ht=0;Ht<R.textures.length;Ht++){const Gt=ot.get(R.textures[Ht]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+Ht,Gt.__webglTexture,dt,Ot)}}else if(R!==null&&dt!==0){const Ot=ot.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Ot.__webglTexture,dt)}nt=-1};function lo(R){const Y=ot.get(R);return(Y.__readFormat!==R.format||Y.__readType!==R.type)&&(Y.__readFormat=R.format,Y.__readType=R.type,Y.__formatReadable=z.textureFormatReadable(R.format),Y.__typeReadable=z.textureTypeReadable(R.type)),Y}this.readRenderTargetPixels=function(R,Y,dt,lt,ct,zt,kt,Ot=0){if(!(R&&R.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=ot.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&kt!==void 0&&(Ht=Ht[kt]),Ht){E.bindFramebuffer(K.FRAMEBUFFER,Ht);try{const Gt=R.textures[Ot],le=Gt.format,ge=Gt.type;R.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ot);const Yt=lo(Gt);if(Yt.__formatReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Yt.__typeReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=R.width-lt&&dt>=0&&dt<=R.height-ct&&K.readPixels(Y,dt,lt,ct,Lt.convert(le),Lt.convert(ge),zt)}finally{const Gt=q!==null?ot.get(q).__webglFramebuffer:null;E.bindFramebuffer(K.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(R,Y,dt,lt,ct,zt,kt,Ot=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ht=ot.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&kt!==void 0&&(Ht=Ht[kt]),Ht)if(Y>=0&&Y<=R.width-lt&&dt>=0&&dt<=R.height-ct){E.bindFramebuffer(K.FRAMEBUFFER,Ht);const Gt=R.textures[Ot],le=Gt.format,ge=Gt.type;R.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ot);const Yt=lo(Gt);if(Yt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Yt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,Le),K.bufferData(K.PIXEL_PACK_BUFFER,zt.byteLength,K.STREAM_READ),K.readPixels(Y,dt,lt,ct,Lt.convert(le),Lt.convert(ge),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);const tn=q!==null?ot.get(q).__webglFramebuffer:null;E.bindFramebuffer(K.FRAMEBUFFER,tn);const Je=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await QM(K,Je,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,Le),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,zt),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(Le),K.deleteSync(Je),zt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,Y=null,dt=0){const lt=Math.pow(2,-dt),ct=Math.floor(R.image.width*lt),zt=Math.floor(R.image.height*lt),kt=Y!==null?Y.x:0,Ot=Y!==null?Y.y:0;vt.setTexture2D(R,0),K.copyTexSubImage2D(K.TEXTURE_2D,dt,0,0,kt,Ot,ct,zt),E.unbindTexture()},this.copyTextureToTexture=function(R,Y,dt=null,lt=null,ct=0,zt=0){let kt,Ot,Ht,Gt,le,ge,Yt,Le,tn;const Je=R.isCompressedTexture?R.mipmaps[zt]:R.image;if(dt!==null)kt=dt.max.x-dt.min.x,Ot=dt.max.y-dt.min.y,Ht=dt.isBox3?dt.max.z-dt.min.z:1,Gt=dt.min.x,le=dt.min.y,ge=dt.isBox3?dt.min.z:0;else{const sn=Math.pow(2,-ct);kt=Math.floor(Je.width*sn),Ot=Math.floor(Je.height*sn),R.isDataArrayTexture?Ht=Je.depth:R.isData3DTexture?Ht=Math.floor(Je.depth*sn):Ht=1,Gt=0,le=0,ge=0}lt!==null?(Yt=lt.x,Le=lt.y,tn=lt.z):(Yt=0,Le=0,tn=0);const he=Lt.convert(Y.format),gn=Lt.convert(Y.type);let Xt;Y.isData3DTexture?(vt.setTexture3D(Y,0),Xt=K.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(vt.setTexture2DArray(Y,0),Xt=K.TEXTURE_2D_ARRAY):(vt.setTexture2D(Y,0),Xt=K.TEXTURE_2D),E.activeTexture(K.TEXTURE0),E.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,Y.flipY),E.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),E.pixelStorei(K.UNPACK_ALIGNMENT,Y.unpackAlignment);const bn=E.getParameter(K.UNPACK_ROW_LENGTH),de=E.getParameter(K.UNPACK_IMAGE_HEIGHT),Hn=E.getParameter(K.UNPACK_SKIP_PIXELS),ai=E.getParameter(K.UNPACK_SKIP_ROWS),Gn=E.getParameter(K.UNPACK_SKIP_IMAGES);E.pixelStorei(K.UNPACK_ROW_LENGTH,Je.width),E.pixelStorei(K.UNPACK_IMAGE_HEIGHT,Je.height),E.pixelStorei(K.UNPACK_SKIP_PIXELS,Gt),E.pixelStorei(K.UNPACK_SKIP_ROWS,le),E.pixelStorei(K.UNPACK_SKIP_IMAGES,ge);const Ba=R.isDataArrayTexture||R.isData3DTexture,Fe=Y.isDataArrayTexture||Y.isData3DTexture;if(R.isDepthTexture){const sn=ot.get(R),gi=ot.get(Y),qe=ot.get(sn.__renderTarget),Wi=ot.get(gi.__renderTarget);E.bindFramebuffer(K.READ_FRAMEBUFFER,qe.__webglFramebuffer),E.bindFramebuffer(K.DRAW_FRAMEBUFFER,Wi.__webglFramebuffer);for(let Ui=0;Ui<Ht;Ui++)Ba&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,ot.get(R).__webglTexture,ct,ge+Ui),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,ot.get(Y).__webglTexture,zt,tn+Ui)),K.blitFramebuffer(Gt,le,kt,Ot,Yt,Le,kt,Ot,K.DEPTH_BUFFER_BIT,K.NEAREST);E.bindFramebuffer(K.READ_FRAMEBUFFER,null),E.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(ct!==0||R.isRenderTargetTexture||ot.has(R)){const sn=ot.get(R),gi=ot.get(Y);E.bindFramebuffer(K.READ_FRAMEBUFFER,k),E.bindFramebuffer(K.DRAW_FRAMEBUFFER,tt);for(let qe=0;qe<Ht;qe++)Ba?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,sn.__webglTexture,ct,ge+qe):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,sn.__webglTexture,ct),Fe?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,gi.__webglTexture,zt,tn+qe):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,gi.__webglTexture,zt),ct!==0?K.blitFramebuffer(Gt,le,kt,Ot,Yt,Le,kt,Ot,K.COLOR_BUFFER_BIT,K.NEAREST):Fe?K.copyTexSubImage3D(Xt,zt,Yt,Le,tn+qe,Gt,le,kt,Ot):K.copyTexSubImage2D(Xt,zt,Yt,Le,Gt,le,kt,Ot);E.bindFramebuffer(K.READ_FRAMEBUFFER,null),E.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else Fe?R.isDataTexture||R.isData3DTexture?K.texSubImage3D(Xt,zt,Yt,Le,tn,kt,Ot,Ht,he,gn,Je.data):Y.isCompressedArrayTexture?K.compressedTexSubImage3D(Xt,zt,Yt,Le,tn,kt,Ot,Ht,he,Je.data):K.texSubImage3D(Xt,zt,Yt,Le,tn,kt,Ot,Ht,he,gn,Je):R.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,zt,Yt,Le,kt,Ot,he,gn,Je.data):R.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,zt,Yt,Le,Je.width,Je.height,he,Je.data):K.texSubImage2D(K.TEXTURE_2D,zt,Yt,Le,kt,Ot,he,gn,Je);E.pixelStorei(K.UNPACK_ROW_LENGTH,bn),E.pixelStorei(K.UNPACK_IMAGE_HEIGHT,de),E.pixelStorei(K.UNPACK_SKIP_PIXELS,Hn),E.pixelStorei(K.UNPACK_SKIP_ROWS,ai),E.pixelStorei(K.UNPACK_SKIP_IMAGES,Gn),zt===0&&Y.generateMipmaps&&K.generateMipmap(Xt),E.unbindTexture()},this.initRenderTarget=function(R){ot.get(R).__webglFramebuffer===void 0&&vt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?vt.setTextureCube(R,0):R.isData3DTexture?vt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?vt.setTexture2DArray(R,0):vt.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){B=0,X=0,q=null,E.reset(),Ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ta}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Ae._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ae._getUnpackColorSpace()}}class Ou extends Ge{constructor(t,n={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,o=n.color!==void 0?new te(n.color):new te(8355711),c=n.textureWidth||512,u=n.textureHeight||512,h=n.clipBias||0,m=n.shader||Ou.ReflectorShader,d=n.multisample!==void 0?n.multisample:4,v=new Ra,_=new G,g=new G,x=new G,b=new Ee,w=new G(0,0,-1),y=new an,S=new G,C=new G,O=new an,A=new Ee,U=new Di(c,u,{samples:d,type:ki}),L=new ni({name:m.name!==void 0?m.name:"unspecified",uniforms:Xx.clone(m.uniforms),fragmentShader:m.fragmentShader,vertexShader:m.vertexShader});L.uniforms.tDiffuse.value=U.texture,L.uniforms.color.value=o,L.uniforms.textureMatrix.value=A,this.material=L,this.onBeforeRender=function(I,T,P){const F=this.getReflectionCamera(P);if(g.setFromMatrixPosition(a.matrixWorld),x.setFromMatrixPosition(P.matrixWorld),b.extractRotation(a.matrixWorld),_.set(0,0,1),_.applyMatrix4(b),S.subVectors(g,x),S.dot(_)>0===!0&&this.forceUpdate===!1)return;S.reflect(_).negate(),S.add(g),b.extractRotation(P.matrixWorld),w.set(0,0,-1),w.applyMatrix4(b),w.add(x),C.subVectors(g,w),C.reflect(_).negate(),C.add(g),F.position.copy(S),F.up.set(0,1,0),F.up.applyMatrix4(b),F.up.reflect(_),F.lookAt(C),F.far=P.far,F.updateMatrixWorld(),F.projectionMatrix.copy(P.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(F.projectionMatrix),A.multiply(F.matrixWorldInverse),A.multiply(a.matrixWorld),v.setFromNormalAndCoplanarPoint(_,g),v.applyMatrix4(F.matrixWorldInverse),y.set(v.normal.x,v.normal.y,v.normal.z,v.constant);const H=F.projectionMatrix;F.isOrthographicCamera?(O.x=(Math.sign(y.x)+H.elements[8])/H.elements[0],O.y=(Math.sign(y.y)+H.elements[9])/H.elements[5],O.z=-P.far,O.w=1):(O.x=(Math.sign(y.x)+H.elements[8])/H.elements[0],O.y=(Math.sign(y.y)+H.elements[9])/H.elements[5],O.z=-1,O.w=(1+H.elements[10])/H.elements[14]),y.multiplyScalar(2/y.dot(O)),H.elements[2]=y.x,H.elements[6]=y.y,F.isOrthographicCamera?(H.elements[10]=y.z-h,H.elements[14]=y.w-1):(H.elements[10]=y.z+1-h,H.elements[14]=y.w),a.visible=!1;const $=I.getRenderTarget(),k=I.xr.enabled,tt=I.shadowMap.autoUpdate;I.xr.enabled=!1,I.shadowMap.autoUpdate=!1,I.setRenderTarget(U),I.state.buffers.depth.setMask(!0),I.autoClear===!1&&I.clear(),I.render(T,F),I.xr.enabled=k,I.shadowMap.autoUpdate=tt,I.setRenderTarget($);const B=P.viewport;B!==void 0&&I.state.viewport(B),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return U},this.dispose=function(){U.dispose(),a.material.dispose()},this.getReflectionCamera=function(I){let T=this._reflectionCameras.get(I);return T===void 0&&(T=I.clone(),this._reflectionCameras.set(I,T)),T}}}Ou.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function Su(r,t=!1){const n=r[0].index!==null,a=new Set(Object.keys(r[0].attributes)),o=new Set(Object.keys(r[0].morphAttributes)),c={},u={},h=r[0].morphTargetsRelative,m=new dn;let d=0;for(let v=0;v<r.length;++v){const _=r[v];let g=0;if(n!==(_.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in _.attributes){if(!a.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;c[x]===void 0&&(c[x]=[]),c[x].push(_.attributes[x]),g++}if(g!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". Make sure all geometries have the same number of attributes."),null;if(h!==_.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in _.morphAttributes){if(!o.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+".  .morphAttributes must be consistent throughout all geometries."),null;u[x]===void 0&&(u[x]=[]),u[x].push(_.morphAttributes[x])}if(t){let x;if(n)x=_.index.count;else if(_.attributes.position!==void 0)x=_.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". The geometry must have either an index or a position attribute"),null;m.addGroup(d,x,v),d+=x}}if(n){let v=0;const _=[];for(let g=0;g<r.length;++g){const x=r[g].index;for(let b=0;b<x.count;++b)_.push(x.getX(b)+v);v+=r[g].attributes.position.count}m.setIndex(_)}for(const v in c){const _=$_(c[v]);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+v+" attribute."),null;m.setAttribute(v,_)}for(const v in u){const _=u[v][0].length;if(_!==0){m.morphAttributes=m.morphAttributes||{},m.morphAttributes[v]=[];for(let g=0;g<_;++g){const x=[];for(let w=0;w<u[v].length;++w)x.push(u[v][w][g]);const b=$_(x);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+v+" morphAttribute."),null;m.morphAttributes[v].push(b)}}}return m}function $_(r){let t,n,a,o=-1,c=0;for(let d=0;d<r.length;++d){const v=r[d];if(t===void 0&&(t=v.array.constructor),t!==v.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=v.itemSize),n!==v.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(a===void 0&&(a=v.normalized),a!==v.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(o===-1&&(o=v.gpuType),o!==v.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;c+=v.count*n}const u=new t(c),h=new Gi(u,n,a);let m=0;for(let d=0;d<r.length;++d){const v=r[d];if(v.isInterleavedBufferAttribute){const _=m/n;for(let g=0,x=v.count;g<x;g++)for(let b=0;b<n;b++){const w=v.getComponent(g,b);h.setComponent(g+_,b,w)}}else u.set(v.array,m);m+=v.count*n}return o!==void 0&&(h.gpuType=o),h}function tx(r=7391){return()=>{r|=0,r=r+1831565813|0;let t=Math.imul(r^r>>>15,1|r);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Yr(r,t){return Math.hypot((r+.18)/2.55,(t+.55)/3.45)}function ps(r,t){const n=Yr(r,t),a=.32-.77*Math.exp(-Math.pow(n/.91,6)),o=Math.max(0,-t-5)*.034,c=Math.sin(r*1.7+t*.37)*.064+Math.sin(t*2.3-r*.67)*.032;return a+o+c*Math.min(1,n)}const R2={yaw:.105,pitch:.057},C2={follow:.38,settle:2.8};function D2(r,t,n){return Math.max(1,Math.min(2,n||1,Math.sqrt(42e5/Math.max(1,r*t))))}const ex=new G(0,1,0),vp=Math.PI*2;function nx(r,t,n){return 1+.055*Math.sin(r*5.3+n*4.1)*Math.cos(t*4.6)+.026*Math.sin(n*10.8+r*7.7+t*2.1)}function ix(r,t,n){const a=t+.13*Math.sin(r*8.1+n*3.7)*Math.cos(n*6.3),o=.62+.38*Math.sin(r*4.2+n*3.2+.9);return Up.smoothstep(a,.22,.79)*o}function U2(){const r=[],t=[];for(let a=0;a<3;a++){const o=a/3*vp,c=Math.cos(o),u=Math.sin(o),h=r.length/3;for(const[m,d,v]of[[-.2,0,0],[.2,0,0],[-.11,.63,.06],[.11,.63,.06],[0,1,.23]])r.push(m*c-v*u,d,m*u+v*c);t.push(h,h+1,h+2,h+1,h+3,h+2,h+2,h+3,h+4)}const n=new dn;return n.setAttribute("position",new Re(r,3)),n.setIndex(t),n.computeVertexNormals(),n}function L2(r,t){const n=new Ua;n.name="forest-stones";const a=[],o=[],c=new te("#a0a7a1"),u=new te("#69776e"),h=new te("#7b8a4d"),m=(b,w,y,S=.66)=>{const C=y>=.45,O=new Hp(1,C?3:1),A=O.attributes.position,U=O.attributes.normal,L=[],I=new G;for(let W=0;W<A.count;W++){const H=A.getX(W),$=A.getY(W),k=A.getZ(W),tt=nx(H,$,k);A.setXYZ(W,H*tt,$*tt*S,k*tt*.85),I.set(H,$/S,k/.85).normalize(),U.setXYZ(W,I.x,I.y,I.z);const B=.035*Math.sin(H*17.3+k*12.7)*Math.sin($*11.1-k*3.9),X=c.clone().lerp(u,Up.smoothstep(-$,-.25,.65)*.58);X.lerp(h,ix(H,$,k)*.77),X.multiplyScalar(.97+B),L.push(X.r,X.g,X.b)}O.setAttribute("color",new Re(L,3));const T=t()*vp,P=new ia().setFromAxisAngle(ex,T),F=new G(b,ps(b,w)+y*.12,w);if(O.scale(y,y,y),O.applyQuaternion(P),O.translate(F.x,F.y,F.z),a.push(O),C)for(let W=0;W<110;W++){const H=(t()-.5)*1.56,$=(t()-.5)*1.56,k=H*H+$*$;if(k>.9)continue;const tt=Math.sqrt(1-k);if(ix(H,tt,$)<.42)continue;const B=nx(H,tt,$),X=new G(H,tt/S,$/.85).normalize(),q=new G(H*B*y,tt*B*S*y,$*B*.85*y);q.addScaledVector(X,-.008).applyQuaternion(P).add(F);const nt=new ia().setFromUnitVectors(ex,X).premultiply(P),rt=.009+t()*.018,N=.018+t()*.022,et=new Ee().compose(q,nt,new G(N,rt,N)),Q=new te().setHSL(.205+t()*.035,.28+t()*.12,.26+t()*.1);o.push({matrix:et,color:Q})}};[[-2.45,1.8,.73],[2.6,1,.77],[-2.25,-2.1,.56],[1.8,-3.45,.69],[-.72,2.91,.33],[.58,3.07,.38],[-3.1,-4.9,.8],[3.4,-6.1,1.1]].forEach(([b,w,y])=>m(b,w,y));for(let b=0;b<76;b++){const w=t()*vp,y=.9+t()*.32;m(Math.cos(w)*2.55*y-.18,Math.sin(w)*3.45*y-.55,.08+t()*.22)}for(let b=0;b<70;b++){const w=(t()-.5)*4,y=(t()-.5)*5-.5;m(w,y,.035+t()*.09,.6)}const d=r.clone();d.name="forest-smooth-wet-stone",d.color.set("white"),d.vertexColors=!0,d.roughness=.48,d.bumpScale=.015;const v=Su(a);a.forEach(b=>b.dispose());const _=new Ge(v,d);_.name="forest-stone-surfaces",_.castShadow=!0,_.receiveShadow=!0,n.add(_);const g=new Ci({color:"#b7c88a",roughness:.97,side:ei}),x=new wi(U2(),g,o.length);return x.name="forest-stone-moss",o.forEach(({matrix:b,color:w},y)=>{x.setMatrixAt(y,b),x.setColorAt(y,w)}),x.instanceMatrix.needsUpdate=!0,x.castShadow=!0,x.receiveShadow=!0,x.computeBoundingSphere(),n.add(x),n}const N2={follow:.09,settle:.45},ax=2.2;function O2(r,t,n){const a=o=>Number.isFinite(o)?o:0;return{yaw:n.yaw*Math.tanh(a(r)*ax),pitch:-n.pitch*Math.tanh(a(t)*ax)}}function sx(r,t,n,a,o){const c=2/a,u=c*o,h=1/(1+u+.48*u*u+.235*u*u*u),m=r-t,d=(n+c*m)*o,v=t+(m+d)*h;return t-r>0==v>t?[t,0]:[v,(n-c*d)*h]}class P2{constructor(t,n=N2){this.limit=t,this.feel=n,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(t,n){const a=O2(t,n,this.limit);this.targetYaw=a.yaw,this.targetPitch=a.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(t){if(!(t>0))return;const n=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=sx(this.yaw,this.targetYaw,this.yawVelocity,n,t),[this.pitch,this.pitchVelocity]=sx(this.pitch,this.targetPitch,this.pitchVelocity,n,t)}}const tS=new G(0,1,0),Vi=Math.PI*2;function I2(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function kr(r,t,n){const a=document.createElement("canvas");a.width=a.height=r;const o=a.getContext("2d");t(o,I2(n));const c=new Fb(a);return c.colorSpace=ti,c.wrapS=c.wrapT=Mu,c.anisotropy=8,c}function ol(r,t,n,a,o,c){const u=r.canvas.width;for(let h=0;h<n;h++)r.fillStyle=t()>.52?o:c,r.globalAlpha=.12+t()*.35,r.beginPath(),r.ellipse(t()*u,t()*u,.3+t()*a,.4+t()*a,t()*Vi,0,Vi),r.fill();r.globalAlpha=1}function z2(){const r=kr(512,(u,h)=>{u.fillStyle="#6c6856",u.fillRect(0,0,512,512);for(let m=0;m<170;m++){const d=h()*512,v=1+h()*12;u.strokeStyle=m%3===0?"#373e32":m%3===1?"#93917b":"#565a49",u.lineWidth=v,u.globalAlpha=.3+h()*.35,u.beginPath(),u.moveTo(d,-20);for(let _=0;_<550;_+=24)u.lineTo(d+Math.sin(_*.018+m)*(3+v),_);u.stroke()}u.globalAlpha=1;for(let m=0;m<120;m++){const d=h()*512,v=h()*512;u.strokeStyle="#292f24",u.lineWidth=.7+h(),u.beginPath(),u.moveTo(d,v),u.lineTo(d-2,v+6),u.lineTo(d+2,v+19+h()*30),u.stroke()}ol(u,h,7e3,1.4,"#cbc4a1","#252f26");for(let m=0;m<90;m++)u.fillStyle="#b0b39b",u.globalAlpha=.09+h()*.15,u.beginPath(),u.ellipse(h()*512,h()*512,2+h()*10,3+h()*7,h(),0,Vi),u.fill()},7021);r.repeat.set(2,3);const t=kr(256,(u,h)=>{const m=u.createLinearGradient(0,256,180,0);m.addColorStop(0,"#4a713b"),m.addColorStop(.5,"#739d49"),m.addColorStop(1,"#9fbf65"),u.fillStyle=m,u.fillRect(0,0,256,256),ol(u,h,3600,.8,"#bfce83","#365e38"),u.lineWidth=1.6,u.strokeStyle="rgba(202,216,142,.62)",u.beginPath(),u.moveTo(128,260),u.quadraticCurveTo(123,115,128,-4),u.stroke();for(let d=24;d<245;d+=24)for(const v of[-1,1]){const _=128+v*Math.sin(Math.PI*d/256)*127;u.strokeStyle="rgba(183,202,119,.38)",u.lineWidth=.7,u.beginPath(),u.moveTo(128,d+31),u.quadraticCurveTo(128+v*37,d+15,_,d-13),u.stroke();for(let g=1;g<=3;g++){const x=128+(_-128)*g/4;u.strokeStyle="rgba(166,186,107,.2)",u.lineWidth=.4,u.beginPath(),u.moveTo(x,d+31-g*11),u.lineTo(x+v*14,d-g*10),u.stroke()}}},8032),n=kr(256,u=>{u.fillStyle="#737373",u.fillRect(0,0,256,256),u.strokeStyle="#c0c0c0",u.lineWidth=2,u.beginPath(),u.moveTo(128,256),u.lineTo(128,0),u.stroke(),u.lineWidth=1;for(let h=24;h<245;h+=24)for(const m of[-1,1])u.beginPath(),u.moveTo(128,h+31),u.quadraticCurveTo(128+m*37,h+15,128+m*Math.sin(Math.PI*h/256)*127,h-13),u.stroke()},54);n.colorSpace=Ca;const a=kr(512,(u,h)=>{u.fillStyle="#5c6040",u.fillRect(0,0,512,512);for(let m=0;m<240;m++){const d=h()*512,v=h()*512,_=8+h()*40,g=u.createRadialGradient(d,v,0,d,v,_);g.addColorStop(0,m%3===0?"rgba(114,125,59,.55)":"rgba(49,55,37,.5)"),g.addColorStop(1,"rgba(60,62,37,0)"),u.fillStyle=g,u.fillRect(d-_,v-_,_*2,_*2)}ol(u,h,18e3,1.6,"#a19465","#2f392b");for(let m=0;m<650;m++){u.strokeStyle=h()>.5?"#90825c":"#303d2b",u.globalAlpha=.5,u.lineWidth=.4+h();const d=h()*512,v=h()*512;u.beginPath(),u.moveTo(d,v),u.lineTo(d+h()*9-4,v+2+h()*13),u.stroke()}},1643);a.repeat.set(10,10);const o=kr(512,(u,h)=>{u.fillStyle="#939787",u.fillRect(0,0,512,512);for(let m=0;m<180;m++){const d=h()*512,v=h()*512,_=8+h()*65,g=u.createRadialGradient(d,v,0,d,v,_);g.addColorStop(0,m%2?"rgba(63,72,64,.25)":"rgba(205,203,175,.36)"),g.addColorStop(1,"rgba(100,110,91,0)"),u.fillStyle=g,u.fillRect(d-_,v-_,_*2,_*2)}ol(u,h,13e3,1.1,"#dad7bd","#3c493e"),u.strokeStyle="rgba(208,211,187,.2)",u.lineWidth=1.4;for(let m=0;m<8;m++){u.beginPath(),u.moveTo(h()*512,0);for(let d=0;d<520;d+=40)u.lineTo((m*77+Math.sin(d/90)*39)%512,d);u.stroke()}},9076),c=kr(256,(u,h)=>{u.fillStyle="#506a32",u.fillRect(0,0,256,256),ol(u,h,12500,1.2,"#a7ae5b","#273f26");for(let m=0;m<900;m++){const d=h()*256,v=h()*256;u.strokeStyle=h()>.5?"#84944a":"#3f572b",u.lineWidth=.7,u.beginPath(),u.moveTo(d,v),u.lineTo(d+h()*3-1.5,v-1-h()*5),u.stroke()}},3363);return c.repeat.set(2,2),{bark:new Ci({color:"#c3baa3",map:r,bumpMap:r,bumpScale:.07,roughness:.93}),leaf:new M_({color:"#b9d593",map:t,bumpMap:n,bumpScale:.018,roughness:.48,metalness:0,clearcoat:.26,clearcoatRoughness:.36,side:ei}),ground:new Ci({color:"#c0b79a",map:a,bumpMap:a,bumpScale:.08,roughness:.98}),rock:new Ci({color:"#bdc1af",map:o,bumpMap:o,bumpScale:.035,roughness:.66}),moss:new Ci({color:"#c0cd91",map:c,bumpMap:c,bumpScale:.035,roughness:.97}),twig:new Ci({color:"#686b37",roughness:.89}),dew:new M_({color:"#bed7c9",roughness:.075,metalness:.35,transmission:0,transparent:!0,opacity:.55,clearcoat:1,clearcoatRoughness:0,ior:1.33})}}function Xp(r=9,t=1){const n=[],a=[],o=[];for(let u=0;u<=r;u++){const h=u/r,m=Math.pow(Math.sin(Math.PI*h),.78)*.3*t+.001;for(let d=0;d<=2;d++){const v=d-1;n.push(v*m,h,Math.sin(h*Math.PI)*.085-Math.abs(v)*m*.19+h*h*.07),a.push(d/2,h)}}for(let u=0;u<r;u++)for(let h=0;h<2;h++){const m=u*3+h,d=m+3;o.push(m,m+1,d,m+1,d+1,d)}const c=new dn;return c.setAttribute("position",new Re(n,3)),c.setAttribute("uv",new Re(a,2)),c.setIndex(o),c.computeVertexNormals(),c}function Kr(r,t,n,a){const o=new Nx(r),c=Math.max(r.length*3,9),u=o.computeFrenetFrames(c,!1),h=[],m=[],d=[],v=Array.from({length:n},()=>.92+a()*.16);for(let g=0;g<=c;g++){const x=g/c,b=o.getPointAt(x),w=x*(t.length-1),y=Math.floor(w),S=Math.min(y+1,t.length-1),C=Up.lerp(t[y],t[S],w-y);for(let O=0;O<=n;O++){const A=O/n*Vi,U=C*v[O%n]*(1+Math.sin(g*1.3+O*3.7)*.025),L=b.clone().addScaledVector(u.normals[g],Math.cos(A)*U).addScaledVector(u.binormals[g],Math.sin(A)*U);h.push(L.x,L.y,L.z),m.push(O/n,x)}}for(let g=0;g<c;g++)for(let x=0;x<n;x++){const b=g*(n+1)+x,w=b+n+1;d.push(b,b+1,w,b+1,w+1,w)}const _=new dn;return _.setAttribute("position",new Re(h,3)),_.setAttribute("uv",new Re(m,2)),_.setIndex(d),_.computeVertexNormals(),_}function Wp(r){const t=[],n=[],a=[],o=[];let c=0;for(const h of r){const m=h.getAttribute("position"),d=h.getAttribute("normal"),v=h.getAttribute("uv");for(let g=0;g<m.count;g++)t.push(m.getX(g),m.getY(g),m.getZ(g)),n.push(d.getX(g),d.getY(g),d.getZ(g)),a.push(v.getX(g),v.getY(g));const _=h.getIndex();if(_)for(let g=0;g<_.count;g++)o.push(_.getX(g)+c);c+=m.count,h.dispose()}const u=new dn;return u.setAttribute("position",new Re(t,3)),u.setAttribute("normal",new Re(n,3)),u.setAttribute("uv",new Re(a,2)),u.setIndex(o),u.computeBoundingSphere(),u}function Cu(r,t,n,a,o=1){const c=t.clone().normalize(),u=c.clone().cross(n).normalize();u.lengthSq()<.1&&u.set(1,0,0);const h=u.clone().cross(c).normalize(),m=new Ee().makeBasis(u,c,h);return m.scale(new G(a*o,a,a)),m.setPosition(r),m}function qp(r,t=!1){return new te().setHSL(.19+r()*.075,.28+r()*.23,(t?.6:.49)+r()*.2)}function B2(r,t,n){const{height:a,radius:o}=n,c=n.detail==="far"||n.detail===!1||n.detail===0?0:n.detail==="mid"||n.detail===1?1:2,u=new Ua;u.name="forest-tree";const h=[],m=[],d=new G((t()-.5)*a*.135,0,(t()-.5)*a*.105),v=[new G(0,-.12,0),new G(d.x*.1,a*.2,d.z*.1),new G(d.x*.35,a*.55,d.z*.4),new G(d.x,a,d.z)];if(h.push(Kr(v,[o*1.36,o,o*.67,o*.15],c===2?14:9,t)),c>0){const b=5+Math.floor(t()*3);for(let w=0;w<b;w++){const y=w/b*Vi+t()*.28,S=o*(3+t()*2.3);h.push(Kr([new G(Math.cos(y)*o*.2,o*.72,Math.sin(y)*o*.2),new G(Math.cos(y)*S*.45,.14,Math.sin(y)*S*.45),new G(Math.cos(y+.15)*S,-.04,Math.sin(y+.15)*S)],[o*.32,o*.19,.018],7,t))}}const _=c===0?7:10;for(let b=0;b<_;b++){const w=.4+b/_*.49,y=b*2.39996+t()*.42,S=a*(.14+t()*.11)*(1-Math.max(0,w-.65)*1.6),C=new G(d.x*w*w,a*w,d.z*w*w),O=new G(C.x+Math.cos(y)*S,C.y+a*(.08+t()*.07),C.z+Math.sin(y)*S),A=C.clone().lerp(O,.53);A.y-=a*.024,h.push(Kr([C,A,O],[o*(.31-w*.13),o*.1,o*.024],c===2?8:6,t));const U=c===0?2:3;for(let L=0;L<U;L++){const I=C.clone().lerp(O,.5+L*.2),T=y+(L-1)*.88+(t()-.5)*.55,P=I.clone().add(new G(Math.cos(T)*S*.56,a*(.035+t()*.06),Math.sin(T)*S*.56));c>0&&h.push(Kr([I,I.clone().lerp(P,.5).add(new G(0,-.04,0)),P],[o*.064,o*.036,.009],5,t));const F=c===0?32:c===1?46:58;for(let W=0;W<F;W++){const H=t()*Vi,$=Math.sqrt(t()),k=S*(.3+t()*.09),B=I.clone().lerp(P,.45+t()*.67).add(new G(Math.cos(H)*k*$,(t()-.5)*k*.65,Math.sin(H)*k*$)),X=new G(Math.cos(H),(t()-.5)*.9,Math.sin(H)),q=new G((t()-.5)*.75,1,(t()-.5)*.75);m.push(Cu(B,X,q,a*(.021+t()*.016),.9+t()*.45))}}}const g=new Ge(Wp(h),r.bark);g.name="forest-tree-bark",g.castShadow=c>0,g.receiveShadow=!0,u.add(g);const x=new wi(Xp(c===0?3:c===1?4:6),r.leaf,m.length);return x.name="forest-tree-leaves",m.forEach((b,w)=>{x.setMatrixAt(w,b),x.setColorAt(w,qp(t))}),x.instanceMatrix.needsUpdate=!0,x.castShadow=c>0,x.receiveShadow=!0,x.computeBoundingSphere(),u.add(x),u.userData.foliage=x,u.userData.swaySeed=t()*Vi,u}function F2(r,t,n=1){const a=new Ua;a.name="forest-fern";const o=6+Math.floor(t()*3),c=[],u=[];for(let d=0;d<o;d++){const v=d/o*Vi+t()*.3,_=(.52+t()*.4)*n,g=(.2+t()*.13)*n,x=new G(Math.cos(v),0,Math.sin(v)),b=new G(-Math.sin(v),0,Math.cos(v)),w=y=>x.clone().multiplyScalar(_*y).setY(.055*n+Math.sin(y*Math.PI*.84)*g);u.push(Kr([w(0),w(.3),w(.64),w(1)],[.01*n,.007*n,.004*n,.001*n],4,t));for(let y=0;y<11;y++){const S=.17+y/11*.78;for(const C of[-1,1]){const O=w(S),A=b.clone().multiplyScalar(C).addScaledVector(x,.4+S*.45).setY(.06-S*.18),U=Math.sin(S*Math.PI)*(.14+.035*t())*n;c.push(Cu(O,A,new G(0,1,0),U,.53))}}c.push(Cu(w(.93),x.clone().setY(-.25),tS,.08*n,.46))}const h=new Ge(Wp(u),r.twig);a.add(h);const m=new wi(Xp(5,.9),r.leaf,c.length);return m.name="forest-fern-leaves",c.forEach((d,v)=>{m.setMatrixAt(v,d),m.setColorAt(v,qp(t,!0))}),m.instanceMatrix.needsUpdate=!0,m.castShadow=!0,m.receiveShadow=!0,m.computeBoundingSphere(),a.add(m),a.userData.foliage=m,a.userData.swaySeed=t()*Vi,a}function H2(r,t,n=1){const a=new Ua;a.name="forest-broadleaf";const o=5+Math.floor(t()*3),c=[],u=[],h=[];for(let _=0;_<o;_++){const g=_/o*Vi+t()*.4,x=n*(.16+t()*.3),b=n*(.12+t()*.18),w=new G(Math.cos(g)*b,x,Math.sin(g)*b);c.push(Kr([new G(0,0,0),w.clone().multiplyScalar(.54).add(new G(0,.055*n,0)),w],[.012*n,.008*n,.004*n],5,t));const y=new G(Math.cos(g),-.1-t()*.2,Math.sin(g)),S=(.34+t()*.3)*n,C=Cu(w,y,tS,S,1.2+t()*.2);u.push(C);for(let O=0;O<2;O++){const A=.28+t()*.47,U=(t()-.5)*.26,L=new G(U,A,Math.sin(A*Math.PI)*.085-Math.abs(U)*.19+A*A*.07+.011).applyMatrix4(C),I=n*(.009+t()*.007);h.push(new Ee().compose(L,new ia,new G(I,I*.72,I)))}}const m=new Ge(Wp(c),r.twig);m.castShadow=!0,a.add(m);const d=new wi(Xp(12),r.leaf,o);d.name="forest-broadleaf-leaves",u.forEach((_,g)=>{d.setMatrixAt(g,_),d.setColorAt(g,qp(t,!0))}),d.instanceMatrix.needsUpdate=!0,d.castShadow=!0,d.receiveShadow=!0,d.computeBoundingSphere(),a.add(d);const v=new wi(new ms(1,8,5),r.dew,h.length);return v.name="forest-leaf-dew",h.forEach((_,g)=>v.setMatrixAt(g,_)),v.instanceMatrix.needsUpdate=!0,v.computeBoundingSphere(),a.add(v),a.userData.foliage=d,a.userData.swaySeed=t()*Vi,a}const ds=(r=0,t=0,n=0)=>new G(r,t,n);class G2{constructor(t,n){this.canvas=t,this.scene=new i_,this.camera=new Ri(55,1,.06,120),this.look=new P2(R2,C2),this.rng=tx(),this.clock={value:0},this.time=0,this.frame=0,this.request=0,this.pendingGPUFrames=[],this.last=0,this.running=!1,this.disposed=!1,this.ready=!1,this.plants=[],this.solidSurfaces=[],this.birds=[],this.leafHitTime=-20,this.leafHit=null,this.raycaster=new C1,this.resources=[],this.renderer=new w2({canvas:t,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=ti,this.renderer.toneMapping=Sp,this.renderer.toneMappingExposure=1.08,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ox,this.renderer.shadowMap.autoUpdate=!1,this.renderer.info.autoReset=!1,this.onLost=a=>{a.preventDefault(),this.stop(),n()},t.addEventListener("webglcontextlost",this.onLost),t.dataset.frames="0",t.dataset.time="0",t.dataset.waterHits="0",t.dataset.leafHits="0"}async init(){this.buildWorld(),this.ready=!0,this.renderer.shadowMap.needsUpdate=!0;try{await this.renderer.compileAsync(this.scene,this.camera)}catch(t){if(!this.disposed)throw t}}buildWorld(){var et;const t=this.rng,n=z2();this.scene.background=new te("#b5c7a7"),this.scene.fog=new Op("#afbea0",15,86),this.camera.position.set(0,1.42,5),this.camera.lookAt(0,1.65,-9),this.scene.add(new E1("#e2eed4","#646447",1.8));const a=new w_("#ffe6ad",4.5);a.position.set(8,13,-18),a.target.position.set(-2,0,1),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),Object.assign(a.shadow.camera,{left:-17,right:17,top:21,bottom:-17,near:1,far:65}),a.shadow.bias=-35e-5,a.shadow.normalBias=.035,this.scene.add(a,a.target);const o=new w_("#bcdad4",.85);o.position.set(-8,5,6),this.scene.add(o);const c=new ni({side:Wn,depthWrite:!1,uniforms:{sun:{value:ds(8,13,-18).normalize()}},vertexShader:"varying vec3 vDir; void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 vDir; uniform vec3 sun; void main(){vec3 d=normalize(vDir);float h=max(0.,d.y);vec3 c=mix(vec3(.72,.77,.59),vec3(.39,.64,.70),pow(h,.7));float s=max(0.,dot(d,sun));c+=vec3(1.,.82,.46)*pow(s,32.)*.65+vec3(1.,.94,.72)*pow(s,700.)*2.;gl_FragColor=vec4(c,1.);#include <tonemapping_fragment>
#include <colorspace_fragment>}`.replace(";#include",`;
#include`)}),u=new Ge(new ms(90,24,16),c);this.scene.add(u);const h=new i_;h.add(new Ge(new ms(30,24,16),c));const m=new pp(this.renderer),d=m.fromScene(h,.05,.1,80);this.scene.environment=d.texture,this.scene.environmentIntensity=.55,this.resources.push(d),m.dispose(),h.children[0].geometry.dispose();const v=new ks(115,115,150,150);v.rotateX(-Math.PI/2),v.translate(0,0,-32);const _=v.attributes.position,g=[];for(let Q=0;Q<_.count;Q++){const j=_.getX(Q),bt=_.getZ(Q);_.setY(Q,ps(j,bt));const wt=(Math.sin(j*.72+bt*.23)+Math.sin(bt*.9-j*.23))*.25+.5,st=new te().lerpColors(new te("#b5a787"),new te("#a4b773"),wt);Yr(j,bt)<1&&st.lerp(new te("#3c4538"),.55),g.push(st.r,st.g,st.b)}v.setAttribute("color",new Re(g,3)),v.computeVertexNormals();const x=n.ground.clone();x.color.set("#ffffff"),x.vertexColors=!0,(et=x.map)==null||et.repeat.set(42,42);const b=new Ge(v,x);b.receiveShadow=!0,this.scene.add(b),this.solidSurfaces.push(b);const w=[[-3.7,-.2,13,.6],[3.85,-1.8,14,.67],[-6.3,-5.8,16,.63],[5.9,-8,15,.61],[-2.8,-9.8,13.5,.41],[1.7,-12.6,15.6,.4],[-7.8,-14,16,.47],[8.2,-15,17,.6],[-4.7,-19,17,.5],[4.8,-23,18,.48],[-.9,-25,17,.43],[-10,-25,19,.55],[11,-28,18,.51],[-7,-32,18,.47],[2.3,-35,19,.43],[-3.5,-40,21,.5],[8,-43,22,.5],[-14,-38,22,.61],[16,-41,22,.65],[-10,-52,22,.4],[.7,-53,23,.37],[5,-62,24,.41],[-7,-67,24,.44],[15,-59,23,.46]];w.push([-9,-3,14,.43],[10,-4,16,.5],[-13,-12,18,.53],[14,-14,17,.49],[-19,-22,20,.57],[20,-25,21,.6],[-4.8,-7,5,.1],[4.2,-11,6.4,.13],[-8.2,-19,8,.18],[6.5,-22,7,.13]);for(let Q=0;Q<4;Q++)for(let j=0;j<9;j++){const bt=(j-4)*6.4+(t()-.5)*4,wt=-31-Q*11+(t()-.5)*6;w.push([bt,wt,15+t()*10,.2+t()*.25])}const y=Q=>{Q.uniforms.forestTime=this.clock,Q.vertexShader=`uniform float forestTime;
`+Q.vertexShader,Q.vertexShader=Q.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vec4 branchPosition=vec4(transformed,1.);
        #ifdef USE_INSTANCING
          branchPosition=instanceMatrix*branchPosition;
        #endif
        float flexibility=pow(clamp(branchPosition.y/16.,0.,1.4),1.65);
        float trunkPhase=modelMatrix[3].x*.37+modelMatrix[3].z*.19;
        vec3 bend=vec3(sin(forestTime*.26+trunkPhase),0.,cos(forestTime*.21+trunkPhase))*.035*flexibility;
        mvPosition.xyz+=(viewMatrix*vec4(bend,0.)).xyz;
        gl_Position=projectionMatrix*mvPosition;`)},S=Q=>{Q.fragmentShader=Q.fragmentShader.replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
        #if NUM_DIR_LIGHTS > 0
          float throughLeaf=pow(max(0.,dot(-normal,directionalLights[0].direction)),1.7);
          reflectedLight.indirectDiffuse+=diffuseColor.rgb*vec3(.34,.42,.15)*throughLeaf;
        #endif`)};n.bark.onBeforeCompile=y,n.bark.customProgramCacheKey=()=>"forest-inherited-branch-wind-v1",n.leaf.onBeforeCompile=Q=>{y(Q),S(Q),Q.vertexShader=Q.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        vec4 windOrigin=vec4(position,1.);
        #ifdef USE_INSTANCING
          windOrigin=instanceMatrix*windOrigin;
        #endif
        windOrigin=modelMatrix*windOrigin;
        float phase=windOrigin.x*.61+windOrigin.z*.42;
        transformed.x+=sin(forestTime*.63+phase)*.012;
        transformed.z+=sin(forestTime*.47+phase*1.7)*.009;`)},n.leaf.customProgramCacheKey=()=>"forest-leaf-wind-v2",n.leaf.clearcoat=0;const C=n.leaf.clone();C.bumpMap=null,C.roughness=.65,C.onBeforeCompile=n.leaf.onBeforeCompile,C.customProgramCacheKey=()=>"forest-distant-leaf-v2";const O=[],A=[],U=[];let L;for(let Q=0;Q<w.length;Q++){const[j,bt,wt,st]=w[Q],pt=Q<5?"near":Q<12||Q>=24&&Q<34?"mid":"far",Tt=B2({...n,leaf:pt==="far"?C:n.leaf},t,{height:wt,radius:st,detail:pt});if(Tt.position.set(j,ps(j,bt),bt),Tt.rotation.y=t()*Math.PI*2,pt!=="far"){this.scene.add(Tt);continue}Tt.updateMatrixWorld(!0);for(const It of Tt.children){const At=It;if(At instanceof wi){L?At.geometry.dispose():L=At.geometry;for(let ee=0;ee<At.count;ee++){const Be=new Ee,ne=new te;At.getMatrixAt(ee,Be),At.getColorAt(ee,ne),A.push(Be.premultiply(At.matrixWorld)),U.push(ne)}At.dispose()}else O.push(At.geometry.clone().applyMatrix4(At.matrixWorld)),At.geometry.dispose()}}const I=new Ge(Su(O),n.bark);I.receiveShadow=!0,this.scene.add(I),O.forEach(Q=>Q.dispose());const T=new wi(L,C,A.length);A.forEach((Q,j)=>{T.setMatrixAt(j,Q),T.setColorAt(j,U[j])}),T.receiveShadow=!0,T.computeBoundingSphere(),this.scene.add(T);const P=L2(n.rock,t);this.scene.add(P),this.solidSurfaces.push(P.children[0]),this.addWater();const F=[],W=[],H=[];let $;for(let Q=0;Q<72;Q++){const j=t()*Math.PI*2,bt=3.7+t()*12,wt=Math.cos(j)*bt,st=Math.sin(j)*bt-5;if(st>3||Yr(wt,st)<1.1)continue;const pt=F2(n,t,.85+t()*1.1);pt.position.set(wt,ps(wt,st)+.015,st),pt.rotation.y=t()*6.28,pt.updateMatrixWorld(!0);for(const Tt of pt.children){const It=Tt;if(It instanceof wi){$?It.geometry.dispose():$=It.geometry;for(let At=0;At<It.count;At++){const ee=new Ee,Be=new te;It.getMatrixAt(At,ee),It.getColorAt(At,Be),W.push(ee.premultiply(It.matrixWorld)),H.push(Be)}It.dispose()}else F.push(It.geometry.clone().applyMatrix4(It.matrixWorld)),It.geometry.dispose()}}const k=new Ge(Su(F),n.twig);this.scene.add(k),F.forEach(Q=>Q.dispose());const tt=new wi($,n.leaf,W.length);W.forEach((Q,j)=>{tt.setMatrixAt(j,Q),tt.setColorAt(j,H[j])}),tt.castShadow=!0,tt.receiveShadow=!0,tt.computeBoundingSphere(),this.scene.add(tt);const B=n.leaf.clone();B.clearcoat=.45,B.roughness=.34,B.onBeforeCompile=S,B.customProgramCacheKey=()=>"forest-wet-leaf-v2";for(const[Q,j,bt]of[[-1.65,3.22,1.1],[1.95,3.02,.95],[-.48,3.48,.82],[.66,3.58,.65],[-2.95,1.4,1.2],[2.85,.7,.92],[-2.1,-2.8,.8]]){const wt=H2({...n,leaf:B},t,bt);wt.position.set(Q,ps(Q,j),j),wt.rotation.y=t()*6.28,wt.userData.baseRotation=wt.rotation.z,this.plants.push(wt),this.scene.add(wt)}const X=new ks(.12,.26,1,2);X.rotateX(-Math.PI/2);const q=new Ci({color:"#776443",roughness:.94,side:ei}),nt=new wi(X,q,380),rt=new Mn;let N=0;for(let Q=0;Q<540&&N<380;Q++){const j=(t()-.5)*28,bt=t()*-35+4;Yr(j,bt)<1.12||(rt.position.set(j,ps(j,bt)+.025,bt),rt.rotation.set((t()-.5)*.24,t()*6.28,(t()-.5)*.2),rt.scale.setScalar(.45+t()*1.6),rt.updateMatrix(),nt.setMatrixAt(N++,rt.matrix))}nt.count=N,this.scene.add(nt),this.addFallenWood(n.bark),this.addUnderstory(),this.addSurroundingStand(n.bark),this.addBirds(),this.addSunrays(),this.addMotes()}addUnderstory(){const t=new dn;t.setAttribute("position",new Re([-.026,0,0,.026,0,0,-.023,.33,.045,.023,.33,.045,-.012,.68,.13,.012,.68,.13,0,1,.27],3)),t.setIndex([0,1,2,1,3,2,2,3,4,3,5,4,4,5,6]),t.computeVertexNormals();const n=new Ci({color:"#829656",roughness:.82,side:ei});n.onBeforeCompile=u=>{u.uniforms.forestTime=this.clock,u.vertexShader=`uniform float forestTime;
`+u.vertexShader,u.vertexShader=u.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float rootPhase=instanceMatrix[3].x*.72+instanceMatrix[3].z*.53;
        transformed.x+=sin(forestTime*.43+rootPhase)*.036*position.y*position.y;
        transformed.z+=sin(forestTime*.31+rootPhase*.71)*.026*position.y*position.y;`)},n.customProgramCacheKey=()=>"forest-rooted-grass-v1";const a=new wi(t,n,6e3),o=new Mn;let c=0;for(let u=0;u<190;u++){const h=(this.rng()-.5)*39,m=3-this.rng()*39;if(Yr(h,m)<1.08)continue;const d=.17+this.rng()*.45;for(let v=0;v<30;v++){const _=h+(this.rng()-.5)*1.65,g=m+(this.rng()-.5)*1.65;Yr(_,g)<1.08||(o.position.set(_,ps(_,g),g),o.rotation.set(0,this.rng()*6.28,0),o.scale.set(.55+this.rng()*.85,d*(.55+this.rng()),.8),o.updateMatrix(),a.setMatrixAt(c,o.matrix),a.setColorAt(c++,new te().setHSL(.21+this.rng()*.06,.28+this.rng()*.2,.45+this.rng()*.2)))}}a.count=c,a.castShadow=!0,a.receiveShadow=!0,a.computeBoundingSphere(),this.scene.add(a)}addSurroundingStand(t){const n=tx(9187),a=[],o=ds(0,1,0),c=(h,m,d,v)=>{const _=m.clone().sub(h),g=new jr(v,d,_.length(),7,3);g.applyQuaternion(new ia().setFromUnitVectors(o,_.normalize())),g.translate(...h.clone().add(m).multiplyScalar(.5).toArray()),a.push(g)};for(let h=0;h<6;h++)for(let m=0;m<24;m++){const d=(m-11.5)*4.3+(n()-.5)*2.8,v=-9-h*9+(n()-.5)*4;if(Math.abs(d)<8.5)continue;const _=ds(d,ps(d,v)-.1,v),g=9+n()*13,x=.13+n()*.24,b=_.clone().add(ds((n()-.5)*1.7,g,(n()-.5)*1.3));c(_,b,x,.04);for(let w=0;w<3;w++){const y=_.clone().lerp(b,.45+w*.14),S=n()*6.28,C=1.8+n()*2.4;c(y,y.clone().add(ds(Math.cos(S)*C,1.3+n()*1.7,Math.sin(S)*C)),x*.22,.012)}}const u=new Ge(Su(a),t);a.forEach(h=>h.dispose()),u.castShadow=!0,u.receiveShadow=!0,this.scene.add(u)}addWater(){const t=new Bx;for(let o=0;o<=100;o++){const c=o/100*Math.PI*2,u=1+.045*Math.sin(c*5)+.025*Math.sin(c*9),h=Math.cos(c)*2.6*u-.18,m=Math.sin(c)*3.48*u+.55;o===0?t.moveTo(h,m):t.lineTo(h,m)}const n={name:"ForestWater",uniforms:{color:{value:new te("#719478")},tDiffuse:{value:null},textureMatrix:{value:new Ee},time:{value:0},ripple:{value:new G(0,0,-100)}},vertexShader:"uniform mat4 textureMatrix; varying vec4 vReflection; varying vec3 vWorld; void main(){vReflection=textureMatrix*vec4(position,1.); vWorld=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`
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
        }`};this.reflection=new Ou(new Gp(t,48),{textureWidth:1024,textureHeight:1024,clipBias:.004,multisample:0,shader:n}),this.reflection.rotation.x=-Math.PI/2,this.reflection.position.y=.075;const a=this.reflection.material;a.transparent=!0,a.depthWrite=!1,this.waterUniforms=a.uniforms,this.reflection.renderOrder=1,this.scene.add(this.reflection)}addFallenWood(t){const n=new jr(.18,.24,3.6,16,8);n.rotateZ(Math.PI/2);const a=new Ge(n,t);a.position.set(-2.8,.59,-5.2),a.rotation.y=-.32,a.castShadow=!0,a.receiveShadow=!0,this.scene.add(a),this.solidSurfaces.push(a)}addBirds(){const t=new Ci({color:"#6c6b4d",roughness:.86}),n=new Ci({color:"#b6b393",roughness:.9}),a=new Ci({color:"#202923",roughness:.28});for(const[o,c,u]of[[-1.68,.93,-5.42]]){const h=new Ua,m=new Ge(new ms(.12,10,8),t);m.scale.set(.8,1,1.35),h.add(m);const d=new Ge(new ms(.096,10,8),n);d.position.set(0,-.01,.06),d.scale.set(.76,.9,1),h.add(d);const v=new Ge(new ms(.075,10,8),t);v.position.set(0,.12,.08),h.add(v);const _=new Ge(new Ru(.021,.075,6),a);_.rotation.x=Math.PI/2,_.position.set(0,.12,.17),h.add(_);const g=new Ge(new Ru(.055,.24,5),t);g.rotation.x=-1.2,g.position.set(0,-.04,-.2),h.add(g);for(const x of[-.036,.036]){const b=new Ge(new jr(.006,.004,.09,4),a);b.position.set(x,-.13,.01),h.add(b)}h.position.set(o,c,u),h.rotation.y=.65,this.birds.push(h),this.scene.add(h)}}addSunrays(){const t=new ni({transparent:!0,depthWrite:!1,side:ei,blending:yu,uniforms:{},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 vUv;void main(){float edge=pow(sin(vUv.x*3.14159),2.);float end=smoothstep(0.,.15,vUv.y)*(1.-smoothstep(.62,1.,vUv.y));gl_FragColor=vec4(.88,.84,.58,edge*end*.034);}"});for(let n=0;n<5;n++){const a=ds(5.3+n*.74,11,-14.5-n*1.5),o=ds(-3.2+n*.65,.1,3-n*.6),c=a.clone().add(o).multiplyScalar(.5),u=a.distanceTo(o),h=new Ge(new ks(.32+n*.16,u),t);h.position.copy(c),h.quaternion.setFromUnitVectors(ds(0,1,0),a.clone().sub(o).normalize()),this.scene.add(h)}}addMotes(){const t=[],n=[];for(let c=0;c<42;c++)t.push((this.rng()-.5)*15,this.rng()*6+.7,-this.rng()*25),n.push(this.rng()*6.28);const a=new dn;a.setAttribute("position",new Re(t,3)),a.setAttribute("phase",new Re(n,1));const o=new ni({transparent:!0,depthWrite:!1,blending:yu,uniforms:{time:this.clock},vertexShader:"uniform float time;attribute float phase;varying float fade;void main(){vec3 p=position;p.x+=sin(time*.15+phase)*.17;p.y+=sin(time*.19+phase)*.13;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(14./-mv.z,1.,2.6);fade=.1+.15*pow(max(0.,sin(phase+time*.12)),2.);}",fragmentShader:"varying float fade;void main(){float a=1.-smoothstep(.08,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.9,.87,.65,a*fade);}"});this.scene.add(new Bb(a,o))}setSize(t,n,a){this.disposed||(this.renderer.setPixelRatio(D2(t,n,a)),this.renderer.setSize(Math.max(1,t),Math.max(1,n),!1),this.camera.aspect=t/Math.max(1,n),this.camera.fov=this.camera.aspect<.8?66:this.camera.aspect>2?45:55,this.camera.updateProjectionMatrix(),this.canvas.dataset.dpr=String(this.renderer.getPixelRatio()))}renderFrame(t){if(!this.ready||this.disposed)return;const n=Math.max(0,Math.min(t,.05));this.time+=n,this.clock.value=this.time,this.look.update(Math.max(0,Math.min(t,1))),this.camera.lookAt(Math.sin(this.look.yaw)*14,1.65+this.look.pitch*14,-9),this.waterUniforms.time.value=this.time;for(let c=0;c<this.plants.length;c++){const u=this.plants[c],h=this.time-this.leafHitTime,m=u===this.leafHit&&h<5?Math.sin(h*5.5)*Math.exp(-h*1.15)*.045:0;u.rotation.z=(u.userData.baseRotation||0)+Math.sin(this.time*.48+c*1.8)*.007+m}for(let c=0;c<this.birds.length;c++)this.birds[c].rotation.y=.65+Math.sin(this.time*.21+c*2.1)*.09;this.renderer.info.reset(),this.renderer.render(this.scene,this.camera),this.frame++;const a=this.renderer.getContext(),o=a.fenceSync(a.SYNC_GPU_COMMANDS_COMPLETE,0);o&&this.pendingGPUFrames.push(o),a.flush(),Object.assign(this.canvas.dataset,{frames:String(this.frame),time:this.time.toFixed(4),lookYaw:this.look.yaw.toFixed(5),lookPitch:this.look.pitch.toFixed(5),drawCalls:String(this.renderer.info.render.calls),triangles:String(this.renderer.info.render.triangles)})}retireGPUFrames(){const t=this.renderer.getContext();for(;this.pendingGPUFrames.length;){const n=this.pendingGPUFrames[0];if(t.clientWaitSync(n,0,0)===t.TIMEOUT_EXPIRED)break;t.deleteSync(n),this.pendingGPUFrames.shift()}}start(){if(this.running||this.disposed)return;this.running=!0,this.canvas.dataset.running="true",this.last=performance.now();const t=n=>{if(this.running){if(this.retireGPUFrames(),this.pendingGPUFrames.length<2){const a=(n-this.last)/1e3;this.last=n,this.renderFrame(a)}this.request=requestAnimationFrame(t)}};this.request=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.request),this.request=0,this.canvas.dataset.running="false",this.look.release()}drag(t,n){this.running&&this.look.drag(t,n)}releaseDrag(){this.look.release()}captureFrame(){if(!this.ready||this.disposed)throw new Error("Forest renderer is not ready.");this.renderFrame(0);const t={dataUrl:this.canvas.toDataURL("image/jpeg",.9),width:this.canvas.width,height:this.canvas.height,time:this.time};return this.retireGPUFrames(),t}setOnInteraction(t){this.onInteraction=t}touch(t,n){var h,m;if(!this.running||this.disposed)return;this.raycaster.setFromCamera(new Wt(t,n),this.camera);const a=this.raycaster.intersectObjects(this.plants,!0)[0],o=this.raycaster.intersectObject(this.reflection)[0],c=Math.min((a==null?void 0:a.distance)??1/0,(o==null?void 0:o.distance)??1/0),u=this.raycaster.intersectObjects(this.solidSurfaces,!1)[0];if(!(u&&u.distance<c-.012))if(a&&(!o||a.distance<o.distance)){let d=a.object;for(;d.parent&&!this.plants.includes(d);)d=d.parent;this.leafHit=d,this.leafHitTime=this.time,this.canvas.dataset.leafHits=String(Number(this.canvas.dataset.leafHits)+1),(h=this.onInteraction)==null||h.call(this,{kind:"leaf",position:a.point.toArray(),strength:.18})}else o&&(this.waterUniforms.ripple.value.set(o.point.x,o.point.z,this.time),this.canvas.dataset.waterHits=String(Number(this.canvas.dataset.waterHits)+1),(m=this.onInteraction)==null||m.call(this,{kind:"water",position:o.point.toArray(),strength:.22}))}dispose(){var c;if(this.disposed)return;this.stop(),this.disposed=!0,this.ready=!1,this.onInteraction=void 0;const t=this.renderer.getContext();this.pendingGPUFrames.forEach(u=>t.deleteSync(u)),this.pendingGPUFrames=[],this.canvas.removeEventListener("webglcontextlost",this.onLost);const n=new Set,a=new Set,o=new Set;this.scene.traverse(u=>{var m;const h=u;if(h.geometry&&n.add(h.geometry),u instanceof wi&&u.dispose(),h.material)for(const d of Array.isArray(h.material)?h.material:[h.material])a.add(d);u instanceof Vp&&"shadow"in u&&((m=u.shadow)==null||m.dispose())});for(const u of a){for(const h of Object.values(u))h instanceof Pn&&o.add(h);u.dispose()}n.forEach(u=>u.dispose()),o.forEach(u=>u.dispose()),(c=this.reflection)==null||c.getRenderTarget().dispose(),this.resources.forEach(u=>u.dispose()),this.renderer.renderLists.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.scene.clear(),this.canvas.dataset.disposed="true"}}class V2 extends mM{constructor(){super({canvasClass:"forest-world-canvas",isSupported:()=>typeof window.WebGL2RenderingContext<"u",create:(t,n)=>new G2(t,n)})}configure(t){t.setOnInteraction(n=>{var o;const a=this.top;this.status==="ready"&&(a!=null&&a.running)&&((o=a.onInteraction)==null||o.call(a,n))})}touch(t,n,a){var o;this.top!==t||!t.running||this.status!=="ready"||(o=this.engine)==null||o.touch(Math.max(-1,Math.min(1,n)),Math.max(-1,Math.min(1,a)))}captureFrame(){if(!this.top||this.status!=="ready"||!this.engine)throw new Error("No ready forest holder.");return this.engine.captureFrame()}}const hl=new V2;function rx({active:r,className:t,onInteraction:n}){const a=ze.useRef(null),o=ze.useRef(null),c=ze.useRef(null),u=ze.useRef(n);u.current=n;const[h,m]=ze.useState("loading"),d=pM(r);return ze.useEffect(()=>{if(!o.current)return;const v={mount:o.current,running:!1,onStatus:m,onInteraction:g=>{var x;return(x=u.current)==null?void 0:x.call(u,g)}};c.current=v;const _=hl.acquire(v);return()=>{c.current=null,_()}},[]),ze.useEffect(()=>{c.current&&hl.setRunning(c.current,d)},[d,h]),dM(hl,a,c,d&&h==="ready"),ze.useEffect(()=>{const v=a.current,_=c.current;if(!d||h!=="ready"||!v||!_)return;let g=null;const x=S=>{!S.isPrimary||S.button!==0||g||(g={id:S.pointerId,x:S.clientX,y:S.clientY,moved:!1})},b=S=>{!g||S.pointerId!==g.id||Math.hypot(S.clientX-g.x,S.clientY-g.y)>6&&(g.moved=!0)},w=S=>{if(!g||S.pointerId!==g.id)return;const C=!g.moved&&Math.hypot(S.clientX-g.x,S.clientY-g.y)<=6;if(g=null,!C)return;const O=v.getBoundingClientRect();!O.width||!O.height||S.clientX<O.left||S.clientX>O.right||S.clientY<O.top||S.clientY>O.bottom||hl.touch(_,(S.clientX-O.left)/O.width*2-1,1-(S.clientY-O.top)/O.height*2)},y=()=>{g=null};return v.addEventListener("pointerdown",x),window.addEventListener("pointermove",b),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",y),window.addEventListener("blur",y),()=>{v.removeEventListener("pointerdown",x),window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",y),window.removeEventListener("blur",y),y()}},[d,h]),be.jsxs("div",{ref:a,className:`forest-world${t?` ${t}`:""}`,"data-state":h,"data-motion":d?"running":"paused","data-scene-surface":!0,role:"group","aria-label":"아침 숲: 이슬 맺힌 잎과 물가에 앉아 바라보는 숲속 쉼터",children:[be.jsx("div",{ref:o,className:"forest-world-mount"}),h==="loading"?be.jsx("span",{className:"forest-world-status",role:"status",children:"아침 숲을 준비하고 있어요"}):null,h==="failed"?be.jsxs("div",{className:"forest-world-fallback",role:"status",children:[be.jsx("span",{children:"아침 숲"}),be.jsx("p",{children:"이 기기에서 3D 장면을 표시하지 못했어요."}),be.jsx("p",{children:"세션은 계속 이용할 수 있어요."})]}):null]})}const k2=`
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
`,ji=r=>new Promise(t=>window.setTimeout(t,r));async function pi(r,t,n=15e3){const a=performance.now();for(;!r();){if(performance.now()-a>n)throw new Error(t);await ji(80)}}function Xr(r){return{...r.dataset,cssWidth:r.clientWidth,cssHeight:r.clientHeight,width:r.width,height:r.height}}function xl(r,t,n,a){r.dispatchEvent(new PointerEvent(t,{bubbles:!0,cancelable:!0,composed:!0,pointerId:7101,isPrimary:!0,pointerType:"touch",button:0,buttons:t==="pointerup"||t==="pointercancel"?0:1,clientX:n,clientY:a}))}function ll(r,t,n){const a=r.getBoundingClientRect(),o=a.left+a.width*t,c=a.top+a.height*n;xl(r,"pointerdown",o,c),xl(window,"pointerup",o,c)}function X2(){const r=new URLSearchParams(window.location.search),[t,n]=ze.useState(()=>r.get("paused")!=="1"),[a,o]=ze.useState(!0),[c,u]=ze.useState(!1),[h,m]=ze.useState(!1),[d,v]=ze.useState({main:0,second:0}),_=ze.useRef({main:0,second:0}),[g,x]=ze.useState(null),b=r.get("capture")==="1",w=r.get("viewport"),[y,S]=ze.useState(w==="portrait"||w==="landscape"?w:"desktop"),[C,O]=ze.useState(!1),A=ze.useRef(!1),[U,L]=ze.useState(null),I=ze.useRef(null),[T,P]=ze.useState([]),F=ze.useRef([]),[W,H]=ze.useState(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);ze.useEffect(()=>{const q=document.querySelector(".forest-harness"),nt=rt=>{const N=rt.detail;if(N)try{N.result=hl.captureFrame()}catch(et){N.error=et instanceof Error?et.message:String(et)}};return q==null||q.addEventListener("forest:diagnostic-capture",nt),()=>q==null?void 0:q.removeEventListener("forest:diagnostic-capture",nt)},[]),ze.useEffect(()=>{const q=document.documentElement.classList.contains("reduce-motion");return()=>{document.documentElement.classList.toggle("reduce-motion",q)}},[]),ze.useEffect(()=>{document.documentElement.classList.toggle("reduce-motion",h)},[h]),ze.useEffect(()=>{const q=window.matchMedia("(prefers-reduced-motion: reduce)"),nt=()=>H(q.matches);return q.addEventListener("change",nt),()=>q.removeEventListener("change",nt)},[]),ze.useEffect(()=>{let q=null;const nt=N=>{F.current=[...F.current.slice(-19),N],P(F.current)},rt=()=>{const N=document.querySelector(".forest-world-canvas"),et=N?Number(N.dataset.frames):void 0,Q=N?Number(N.dataset.time):void 0,j=document.documentElement.dataset.forestVisibilitySimulation==="ci-hook-test",bt={state:document.visibilityState,at:new Date().toISOString(),frames:et,time:Q,...j?{simulated:!0}:{}};document.hidden&&N&&et!==void 0&&Q!==void 0?(q={canvas:N,frames:et,time:Q,at:performance.now()},bt.note=j?"CI-only simulated hidden hook check; not actual tab visibility.":"Real browser visibilitychange; no hidden property override."):!document.hidden&&q&&(bt.durationMs=Math.round(performance.now()-q.at),N===q.canvas&&et!==void 0&&Q!==void 0?(bt.framesDelta=et-q.frames,bt.timeDelta=Number((Q-q.time).toFixed(4)),bt.durationMs>=800?bt.passed=bt.framesDelta<=2&&bt.timeDelta<=.1:bt.note="Visibility interval shorter than 800 ms; no pause verdict."):bt.note="Canvas changed while hidden; no pause verdict.",q=null),nt(bt)};return document.addEventListener("visibilitychange",rt),()=>document.removeEventListener("visibilitychange",rt)},[]);const $=(q,nt)=>{_.current={..._.current,[q]:_.current[q]+1},v(_.current),x({holder:q,event:nt})},k=async()=>{if(A.current)return;A.current=!0,O(!0);const q={status:"running",startedAt:new Date().toISOString(),method:"In-page DOM PointerEvent assertions through the component handlers. No direct engine calls. Synthetic gestures are not physical-device testing.",environment:{viewportPreset:y,window:[window.innerWidth,window.innerHeight],devicePixelRatio:window.devicePixelRatio,osReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,osReducedMotionTest:"Observed actual media query only; OS emulation is not performed by this harness.",visibilityTest:"Requires a real tab hide/show cycle; see visibilitySamples. No document.hidden override.",userAgent:navigator.userAgent},checks:[]},nt=()=>{I.current={...q,checks:[...q.checks]},L(I.current)},rt=(j,bt,wt)=>{q.checks.push({name:j,passed:bt,detail:wt}),nt()};nt();const N=()=>document.querySelector(".forest-world-canvas"),et=()=>!!document.querySelector('.forest-world[data-state="ready"] .forest-world-canvas'),Q=()=>{var j;return((j=N())==null?void 0:j.dataset.running)==="true"};try{if(u(!1),o(!0),m(!1),n(!0),q.environment.osReducedMotion)throw new Error("The actual OS reduced-motion preference is on. Turn it off before running motion assertions; the harness will not override it.");await pi(()=>et()&&Q(),"The 3D scene did not become ready/running. Inspect fallback and console.",9e4);const j=N();rt("Actual rendered 3D canvas",j.width>0&&j.height>0&&Number(j.dataset.frames)>0&&Number(j.dataset.triangles)>0,Xr(j));const bt=Number(j.dataset.frames),wt=Number(j.dataset.time),st=performance.now();await pi(()=>Number(j.dataset.frames)>bt&&Number(j.dataset.time)>wt,"Active scene did not advance a frame and simulation time.",3e4);const pt=Number(j.dataset.frames)-bt;rt("Active animation advances",pt>0&&Number(j.dataset.time)>wt,{frameDelta:pt,timeDelta:Number(j.dataset.time)-wt,observedMs:Math.round(performance.now()-st),observedFPS:Number((pt*1e3/(performance.now()-st)).toFixed(1))});const Tt={water:Number(j.dataset.waterHits),leaf:Number(j.dataset.leafHits)},It={};for(const Ut of[.62,.78,.9,.48,.36,.97]){for(const gt of[.5,.3,.7,.15,.85,.05,.95]){const _t=Number(j.dataset.waterHits),Ct=Number(j.dataset.leafHits);if(ll(j,gt,Ut),Number(j.dataset.waterHits)>_t&&(It.water=[gt,Ut]),Number(j.dataset.leafHits)>Ct&&(It.leaf=[gt,Ut]),await ji(30),It.water&&It.leaf)break}if(It.water&&It.leaf)break}rt("Water touch through DOM raycast",Number(j.dataset.waterHits)>Tt.water,{before:Tt.water,after:Number(j.dataset.waterHits),screenFraction:It.water}),rt("Leaf touch through DOM raycast",Number(j.dataset.leafHits)>Tt.leaf,{before:Tt.leaf,after:Number(j.dataset.leafHits),screenFraction:It.leaf});const At=It.water??It.leaf??[.5,.78];n(!1),await pi(()=>j.dataset.running==="false","Active=false did not stop the engine."),await ji(200);const ee=j.dataset.frames,Be=j.dataset.time,ne=_.current.main;ll(j,...At),await ji(700),rt("Active=false freezes animation and rejects touches",j.dataset.frames===ee&&j.dataset.time===Be&&_.current.main===ne,{before:{frames:ee,time:Be,callbacks:ne},after:{...Xr(j),callbacks:_.current.main}}),n(!0),await pi(Q,"Animation did not resume after active=true."),m(!0),await pi(()=>document.documentElement.classList.contains("reduce-motion")&&j.dataset.running==="false","App reduced-motion class did not stop the engine."),await ji(200);const me=j.dataset.frames,Ce=j.dataset.time,ue=_.current.main;ll(j,...At),await ji(700),rt("App reduced-motion freezes animation and rejects touches",j.dataset.frames===me&&j.dataset.time===Ce&&_.current.main===ue,{before:{frames:me,time:Ce,callbacks:ue},after:{...Xr(j),callbacks:_.current.main}}),m(!1),await pi(Q,"Animation did not resume after reduced-motion was disabled.");const we=j.getBoundingClientRect(),je=we.left+we.width*.48,ln=we.top+we.height*.48,Oe=Math.min(we.width,we.height),$e=_.current.main;xl(j,"pointerdown",je,ln),xl(window,"pointermove",je+Oe*.22,ln+Oe*.04),await pi(()=>Math.abs(Number(j.dataset.lookYaw))>.009,"DOM drag did not move the camera.",3e4);const K=Math.abs(Number(j.dataset.lookYaw));xl(window,"pointerup",je+Oe*.22,ln+Oe*.04),await ji(120);const De=Math.abs(Number(j.dataset.lookYaw));rt("Gentle drag changes view without a tap",K>.009&&_.current.main===$e,{peakYaw:K,callbacksBefore:$e,callbacksAfter:_.current.main}),await pi(()=>Math.abs(Number(j.dataset.lookYaw))<K*.65,"Camera did not slowly return after drag release.",12e4),rt("View returns gradually after release",De>K*.5&&Math.abs(Number(j.dataset.lookYaw))<K*.65,{peakYaw:K,yaw120msAfterRelease:De,finalYaw:Number(j.dataset.lookYaw)});const _e={..._.current};u(!0),await pi(()=>document.querySelector('[data-testid="second-holder"] .forest-world-canvas')===j&&Q(),"Second holder did not acquire the shared canvas.");const z=document.querySelector('[data-testid="main-holder"] .forest-world');ll(z,...At),await ji(80);const E=_.current.main===_e.main&&_.current.second===_e.second;ll(j,...At),await ji(100),rt("One shared canvas; only top holder gets callbacks",document.querySelectorAll(".forest-world-canvas").length===1&&E&&_.current.main===_e.main&&_.current.second>_e.second,{sameCanvas:document.querySelector('[data-testid="second-holder"] .forest-world-canvas')===j,ignoredCoveredHolder:E,before:_e,after:{..._.current}}),u(!1),await pi(()=>document.querySelector('[data-testid="main-holder"] .forest-world-canvas')===j&&Q(),"Closing the second holder did not return the shared canvas."),rt("Closing second holder returns the same canvas",document.querySelector('[data-testid="main-holder"] .forest-world-canvas')===j,Xr(j)),o(!1),await pi(()=>!N()&&j.dataset.running==="false","Unmount did not stop and detach the canvas.");const it=j.dataset.frames;await ji(5500),rt("Last unmount disposes after host reuse window",j.dataset.disposed==="true"&&j.dataset.running==="false"&&j.dataset.frames===it,Xr(j)),o(!0),await pi(()=>et()&&Q()&&N()!==j,"Remount did not create a fresh ready engine.",9e4);const ot=N(),vt=Number(ot.dataset.frames),Rt=Number(ot.dataset.time);await pi(()=>Number(ot.dataset.frames)>vt&&Number(ot.dataset.time)>Rt,"Remounted engine did not advance a frame and simulation time.",3e4),rt("Remount creates a fresh working engine",ot!==j&&Number(ot.dataset.frames)>vt&&Number(ot.dataset.time)>Rt,Xr(ot))}catch(j){rt("QA sequence completed",!1,j instanceof Error?j.message:String(j))}finally{o(!0),u(!1),m(!1),n(!0),q.finishedAt=new Date().toISOString(),q.status=q.checks.length>0&&q.checks.every(j=>j.passed)?"passed":"failed",nt(),A.current=!1,O(!1)}},tt=()=>{const q={report:I.current,visibilitySamples:F.current,actualOSReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches},nt=URL.createObjectURL(new Blob([JSON.stringify(q,null,2)],{type:"application/json"})),rt=document.createElement("a");rt.href=nt,rt.download="forest-browser-qa.json",rt.click(),window.setTimeout(()=>URL.revokeObjectURL(nt),1e3)},B=y==="portrait"?{width:344,height:800}:y==="landscape"?{width:882,height:344}:{width:"100%",height:"100%"},X=T.filter(q=>q.passed===!0&&!q.simulated).length;return be.jsxs("div",{className:"forest-harness","data-capture":b,"data-active":t,"data-mounted":a,"data-reduced":h,"data-second":c,"data-viewport":y,"data-qa-state":(U==null?void 0:U.status)??"idle",children:[be.jsx("style",{children:k2}),be.jsx("div",{className:"forest-harness-viewport",children:be.jsxs("div",{className:"forest-harness-frame","data-testid":"scene-frame",style:B,children:[be.jsx("main",{className:"forest-harness-stage","data-testid":"main-holder",children:a?be.jsx(rx,{active:t,onInteraction:q=>$("main",q)}):be.jsx("p",{className:"forest-harness-empty",children:"Scene unmounted"})}),a&&c?be.jsx("section",{className:"forest-harness-overlay","aria-label":"Fullscreen holder","data-testid":"second-holder",children:be.jsx(rx,{active:t,onInteraction:q=>$("second",q)})}):null]})}),be.jsxs("aside",{className:"forest-harness-controls","aria-label":"Scene verification controls",children:[be.jsx("h1",{children:"아침 숲 · 독립 3D 검증"}),be.jsxs("div",{className:"forest-harness-actions",children:[be.jsx("button",{disabled:C,type:"button","data-testid":"active-toggle","aria-pressed":t,onClick:()=>n(q=>!q),children:t?"Pause":"Play"}),be.jsxs("button",{disabled:C,type:"button","data-testid":"motion-toggle","aria-pressed":h,onClick:()=>m(q=>!q),children:["Reduced motion ",h?"on":"off"]}),be.jsxs("button",{disabled:C,type:"button","data-testid":"holder-toggle","aria-pressed":c,onClick:()=>u(q=>!q),children:["Second holder ",c?"on":"off"]}),be.jsx("button",{disabled:C,type:"button","data-testid":"mount-toggle","aria-pressed":a,onClick:()=>o(q=>!q),children:a?"Unmount":"Mount"})]}),be.jsxs("div",{className:"forest-harness-actions",children:[be.jsx("button",{disabled:C,type:"button","data-testid":"viewport-desktop","aria-pressed":y==="desktop",onClick:()=>S("desktop"),children:"Desktop"}),be.jsx("button",{disabled:C,type:"button","data-testid":"viewport-portrait","aria-pressed":y==="portrait",onClick:()=>S("portrait"),children:"Fold 344×800"}),be.jsx("button",{disabled:C,type:"button","data-testid":"viewport-landscape","aria-pressed":y==="landscape",onClick:()=>S("landscape"),children:"Fold 882×344"}),be.jsx("button",{disabled:C,type:"button","data-testid":"qa-run",onClick:()=>void k(),children:C?"Running QA…":"Run lifecycle QA"}),be.jsx("button",{type:"button","data-testid":"qa-download",onClick:tt,children:"Download JSON"})]}),be.jsx("p",{children:"조금 드래그하면 시선이 움직이고 천천히 돌아옵니다. 가까운 잎이나 물을 가볍게 눌러 보세요."}),be.jsxs("output",{"data-testid":"interaction-status","data-main-events":d.main,"data-second-events":d.second,"data-event-holder":(g==null?void 0:g.holder)??"","data-event-kind":(g==null?void 0:g.event.kind)??"",children:["Events main ",d.main," / second ",d.second,g?` · ${g.holder}: ${g.event.kind} ${g.event.strength.toFixed(2)}`:" · no audio created"]}),be.jsxs("output",{"data-testid":"visibility-status","data-hidden-passes":X,"data-os-reduced":W,children:["Real hidden cycles passed: ",X," · actual OS reduced motion: ",String(W)," (observed only)"]}),be.jsxs("output",{"data-testid":"qa-status","data-state":(U==null?void 0:U.status)??"idle","data-passed":(U==null?void 0:U.checks.filter(q=>q.passed).length)??0,"data-failed":(U==null?void 0:U.checks.filter(q=>!q.passed).length)??0,children:["QA: ",(U==null?void 0:U.status)??"not run",U?` · ${U.checks.filter(q=>q.passed).length}/${U.checks.length} passed`:""]}),U||T.length?be.jsx("pre",{"data-testid":"qa-report",children:JSON.stringify({report:U,visibilitySamples:T},null,2)}):null]})]})}hM.createRoot(document.getElementById("forest-harness-root")).render(be.jsx(ze.StrictMode,{children:be.jsx(X2,{})}));
