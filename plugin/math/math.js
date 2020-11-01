!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).RevealMath=e()}(this,(function(){"use strict";var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,e,n){return t(n={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&n.path)}},n.exports),n.exports}var n=function(t){return t&&t.Math==Math&&t},r=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof t&&t)||Function("return this")(),o=function(t){try{return!!t()}catch(t){return!0}},i=!o((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),u={}.propertyIsEnumerable,c=Object.getOwnPropertyDescriptor,a={f:c&&!u.call({1:2},1)?function(t){var e=c(this,t);return!!e&&e.enumerable}:u},f=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},l={}.toString,s=function(t){return l.call(t).slice(8,-1)},p="".split,y=o((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==s(t)?p.call(t,""):Object(t)}:Object,h=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},d=function(t){return y(h(t))},g=function(t){return"object"==typeof t?null!==t:"function"==typeof t},b=function(t,e){if(!g(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!g(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!g(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!g(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},v={}.hasOwnProperty,m=function(t,e){return v.call(t,e)},j=r.document,O=g(j)&&g(j.createElement),w=!i&&!o((function(){return 7!=Object.defineProperty((t="div",O?j.createElement(t):{}),"a",{get:function(){return 7}}).a;var t})),x=Object.getOwnPropertyDescriptor,S={f:i?x:function(t,e){if(t=d(t),e=b(e,!0),w)try{return x(t,e)}catch(t){}if(m(t,e))return f(!a.f.call(t,e),t[e])}},M=function(t){if(!g(t))throw TypeError(String(t)+" is not an object");return t},P=Object.defineProperty,T={f:i?P:function(t,e,n){if(M(t),e=b(e,!0),M(n),w)try{return P(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},E=i?function(t,e,n){return T.f(t,e,f(1,n))}:function(t,e,n){return t[e]=n,t},_=function(t,e){try{E(r,t,e)}catch(n){r[t]=e}return e},A=r["__core-js_shared__"]||_("__core-js_shared__",{}),k=Function.toString;"function"!=typeof A.inspectSource&&(A.inspectSource=function(t){return k.call(t)});var C,D,H,J,I=A.inspectSource,L=r.WeakMap,F="function"==typeof L&&/native code/.test(I(L)),N=e((function(t){(t.exports=function(t,e){return A[t]||(A[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.5",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})})),q=0,z=Math.random(),Q=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++q+z).toString(36)},R=N("keys"),G={},W=r.WeakMap;if(F){var $=new W,B=$.get,K=$.has,V=$.set;C=function(t,e){return V.call($,t,e),e},D=function(t){return B.call($,t)||{}},H=function(t){return K.call($,t)}}else{var X=R[J="state"]||(R[J]=Q(J));G[X]=!0,C=function(t,e){return E(t,X,e),e},D=function(t){return m(t,X)?t[X]:{}},H=function(t){return m(t,X)}}var Y,U,Z={set:C,get:D,has:H,enforce:function(t){return H(t)?D(t):C(t,{})},getterFor:function(t){return function(e){var n;if(!g(e)||(n=D(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},tt=e((function(t){var e=Z.get,n=Z.enforce,o=String(String).split("String");(t.exports=function(t,e,i,u){var c=!!u&&!!u.unsafe,a=!!u&&!!u.enumerable,f=!!u&&!!u.noTargetGet;"function"==typeof i&&("string"!=typeof e||m(i,"name")||E(i,"name",e),n(i).source=o.join("string"==typeof e?e:"")),t!==r?(c?!f&&t[e]&&(a=!0):delete t[e],a?t[e]=i:E(t,e,i)):a?t[e]=i:_(e,i)})(Function.prototype,"toString",(function(){return"function"==typeof this&&e(this).source||I(this)}))})),et=r,nt=function(t){return"function"==typeof t?t:void 0},rt=function(t,e){return arguments.length<2?nt(et[t])||nt(r[t]):et[t]&&et[t][e]||r[t]&&r[t][e]},ot=Math.ceil,it=Math.floor,ut=function(t){return isNaN(t=+t)?0:(t>0?it:ot)(t)},ct=Math.min,at=function(t){return t>0?ct(ut(t),9007199254740991):0},ft=Math.max,lt=Math.min,st=function(t){return function(e,n,r){var o,i=d(e),u=at(i.length),c=function(t,e){var n=ut(t);return n<0?ft(n+e,0):lt(n,e)}(r,u);if(t&&n!=n){for(;u>c;)if((o=i[c++])!=o)return!0}else for(;u>c;c++)if((t||c in i)&&i[c]===n)return t||c||0;return!t&&-1}},pt={includes:st(!0),indexOf:st(!1)}.indexOf,yt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype"),ht={f:Object.getOwnPropertyNames||function(t){return function(t,e){var n,r=d(t),o=0,i=[];for(n in r)!m(G,n)&&m(r,n)&&i.push(n);for(;e.length>o;)m(r,n=e[o++])&&(~pt(i,n)||i.push(n));return i}(t,yt)}},dt={f:Object.getOwnPropertySymbols},gt=rt("Reflect","ownKeys")||function(t){var e=ht.f(M(t)),n=dt.f;return n?e.concat(n(t)):e},bt=function(t,e){for(var n=gt(e),r=T.f,o=S.f,i=0;i<n.length;i++){var u=n[i];m(t,u)||r(t,u,o(e,u))}},vt=/#|\.prototype\./,mt=function(t,e){var n=Ot[jt(t)];return n==xt||n!=wt&&("function"==typeof e?o(e):!!e)},jt=mt.normalize=function(t){return String(t).replace(vt,".").toLowerCase()},Ot=mt.data={},wt=mt.NATIVE="N",xt=mt.POLYFILL="P",St=mt,Mt=S.f,Pt=Array.isArray||function(t){return"Array"==s(t)},Tt=function(t){return Object(h(t))},Et=function(t,e,n){var r=b(e);r in t?T.f(t,r,f(0,n)):t[r]=n},_t=!!Object.getOwnPropertySymbols&&!o((function(){return!String(Symbol())})),At=_t&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,kt=N("wks"),Ct=r.Symbol,Dt=At?Ct:Ct&&Ct.withoutSetter||Q,Ht=function(t){return m(kt,t)||(_t&&m(Ct,t)?kt[t]=Ct[t]:kt[t]=Dt("Symbol."+t)),kt[t]},Jt=Ht("species"),It=function(t,e){var n;return Pt(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!Pt(n.prototype)?g(n)&&null===(n=n[Jt])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)},Lt=rt("navigator","userAgent")||"",Ft=r.process,Nt=Ft&&Ft.versions,qt=Nt&&Nt.v8;qt?U=(Y=qt.split("."))[0]+Y[1]:Lt&&(!(Y=Lt.match(/Edge\/(\d+)/))||Y[1]>=74)&&(Y=Lt.match(/Chrome\/(\d+)/))&&(U=Y[1]);var zt,Qt=U&&+U,Rt=Ht("species"),Gt=Ht("isConcatSpreadable"),Wt=Qt>=51||!o((function(){var t=[];return t[Gt]=!1,t.concat()[0]!==t})),$t=(zt="concat",Qt>=51||!o((function(){var t=[];return(t.constructor={})[Rt]=function(){return{foo:1}},1!==t[zt](Boolean).foo}))),Bt=function(t){if(!g(t))return!1;var e=t[Gt];return void 0!==e?!!e:Pt(t)};function Kt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Vt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Xt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Vt(Object(n),!0).forEach((function(e){Kt(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Vt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}!function(t,e){var n,o,i,u,c,a=t.target,f=t.global,l=t.stat;if(n=f?r:l?r[a]||_(a,{}):(r[a]||{}).prototype)for(o in e){if(u=e[o],i=t.noTargetGet?(c=Mt(n,o))&&c.value:n[o],!St(f?o:a+(l?".":"#")+o,t.forced)&&void 0!==i){if(typeof u==typeof i)continue;bt(u,i)}(t.sham||i&&i.sham)&&E(u,"sham",!0),tt(n,o,u,t)}}({target:"Array",proto:!0,forced:!Wt||!$t},{concat:function(t){var e,n,r,o,i,u=Tt(this),c=It(u,0),a=0;for(e=-1,r=arguments.length;e<r;e++)if(i=-1===e?u:arguments[e],Bt(i)){if(a+(o=at(i.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(n=0;n<o;n++,a++)n in i&&Et(c,a,i[n])}else{if(a>=9007199254740991)throw TypeError("Maximum allowed index exceeded");Et(c,a++,i)}return c.length=a,c}});return function(){var t,e={messageStyle:"none",tex2jax:{inlineMath:[["$","$"],["\\(","\\)"]],skipTags:["script","noscript","style","textarea","pre"]},skipStartupTypeset:!0};return{id:"math",init:function(n){var r=(t=n).getConfig().math||{},o=Xt(Xt({},e),r),i=o.mathjax||"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js",u=o.config||"TeX-AMS_HTML-full",c="".concat(i,"?config=").concat(u);o.tex2jax=Xt(Xt({},e.tex2jax),r.tex2jax),o.mathjax=o.config=null,function(t,e){var n=this,r=document.querySelector("head"),o=document.createElement("script");o.type="text/javascript",o.src=t;var i=function(){"function"==typeof e&&(e.call(),e=null)};o.onload=i,o.onreadystatechange=function(){"loaded"===n.readyState&&i()},r.appendChild(o)}(c,(function(){MathJax.Hub.Config(o),MathJax.Hub.Queue(["Typeset",MathJax.Hub,t.getRevealElement()]),MathJax.Hub.Queue(t.layout),t.on("slidechanged",(function(t){MathJax.Hub.Queue(["Typeset",MathJax.Hub,t.currentSlide])}))}))}}}}));
