(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,30203,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={assign:function(){return l},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return i}};for(var n in r)Object.defineProperty(o,n,{enumerable:!0,get:r[n]});function a(e){let t={};for(let[o,r]of e.entries()){let e=t[o];void 0===e?t[o]=r:Array.isArray(e)?e.push(r):t[o]=[e,r]}return t}function s(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function i(e){let t=new URLSearchParams;for(let[o,r]of Object.entries(e))if(Array.isArray(r))for(let e of r)t.append(o,s(e));else t.set(o,s(r));return t}function l(e,...t){for(let o of t){for(let t of o.keys())e.delete(t);for(let[t,r]of o.entries())e.append(t,r)}return e}},95624,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={DecodeError:function(){return w},MiddlewareNotFoundError:function(){return k},MissingStaticPage:function(){return g},NormalizeError:function(){return b},PageNotFoundError:function(){return x},SP:function(){return y},ST:function(){return f},WEB_VITALS:function(){return a},execOnce:function(){return s},getDisplayName:function(){return u},getLocationOrigin:function(){return c},getURL:function(){return p},isAbsoluteUrl:function(){return l},isResSent:function(){return h},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return d},stringifyError:function(){return W}};for(var n in r)Object.defineProperty(o,n,{enumerable:!0,get:r[n]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function s(e){let t,o=!1;return(...r)=>(o||(o=!0,t=e(...r)),t)}let i=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>i.test(e);function c(){let{protocol:e,hostname:t,port:o}=window.location;return`${e}//${t}${o?":"+o:""}`}function p(){let{href:e}=window.location,t=c();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function h(e){return e.finished||e.headersSent}function d(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let o=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let r=await e.getInitialProps(t);if(o&&h(o))return r;if(!r)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${r}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return r}let y="u">typeof performance,f=y&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class w extends Error{}class b extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class g extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class k extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function W(e){return JSON.stringify({message:e.message,stack:e.stack})}},40260,(e,t,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},57047,e=>{"use strict";let t=BigInt(0x100000000-1),o=BigInt(32);e.s(["add",0,function(e,t,o,r){let n=(t>>>0)+(r>>>0);return{h:e+o+(n/0x100000000|0)|0,l:0|n}},"add3H",0,(e,t,o,r)=>t+o+r+(e/0x100000000|0)|0,"add3L",0,(e,t,o)=>(e>>>0)+(t>>>0)+(o>>>0),"add4H",0,(e,t,o,r,n)=>t+o+r+n+(e/0x100000000|0)|0,"add4L",0,(e,t,o,r)=>(e>>>0)+(t>>>0)+(o>>>0)+(r>>>0),"add5H",0,(e,t,o,r,n,a)=>t+o+r+n+a+(e/0x100000000|0)|0,"add5L",0,(e,t,o,r,n)=>(e>>>0)+(t>>>0)+(o>>>0)+(r>>>0)+(n>>>0),"rotlBH",0,(e,t,o)=>t<<o-32|e>>>64-o,"rotlBL",0,(e,t,o)=>e<<o-32|t>>>64-o,"rotlSH",0,(e,t,o)=>e<<o|t>>>32-o,"rotlSL",0,(e,t,o)=>t<<o|e>>>32-o,"rotrBH",0,(e,t,o)=>e<<64-o|t>>>o-32,"rotrBL",0,(e,t,o)=>e>>>o-32|t<<64-o,"rotrSH",0,(e,t,o)=>e>>>o|t<<32-o,"rotrSL",0,(e,t,o)=>e<<32-o|t>>>o,"shrSH",0,(e,t,o)=>e>>>o,"shrSL",0,(e,t,o)=>e<<32-o|t>>>o,"split",0,function(e,r=!1){let n=e.length,a=new Uint32Array(n),s=new Uint32Array(n);for(let i=0;i<n;i++){let{h:n,l}=function(e,r=!1){return r?{h:Number(e&t),l:Number(e>>o&t)}:{h:0|Number(e>>o&t),l:0|Number(e&t)}}(e[i],r);[a[i],s[i]]=[n,l]}return[a,s]}])},28350,e=>{"use strict";let t="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0;function o(e){if(!Number.isSafeInteger(e)||e<0)throw Error("positive integer expected, got "+e)}function r(e,...t){if(!(e instanceof Uint8Array||ArrayBuffer.isView(e)&&"Uint8Array"===e.constructor.name))throw Error("Uint8Array expected");if(t.length>0&&!t.includes(e.length))throw Error("Uint8Array expected of length "+t+", got length="+e.length)}let n=68===new Uint8Array(new Uint32Array([0x11223344]).buffer)[0]?e=>e:function(e){for(let o=0;o<e.length;o++){var t;e[o]=(t=e[o])<<24&0xff000000|t<<8&0xff0000|t>>>8&65280|t>>>24&255}return e};function a(e){return"string"==typeof e&&(e=function(e){if("string"!=typeof e)throw Error("string expected");return new Uint8Array(new TextEncoder().encode(e))}(e)),r(e),e}e.s(["Hash",0,class{},"abytes",0,r,"aexists",0,function(e,t=!0){if(e.destroyed)throw Error("Hash instance has been destroyed");if(t&&e.finished)throw Error("Hash#digest() has already been called")},"ahash",0,function(e){if("function"!=typeof e||"function"!=typeof e.create)throw Error("Hash should be wrapped by utils.createHasher");o(e.outputLen),o(e.blockLen)},"anumber",0,o,"aoutput",0,function(e,t){r(e);let o=t.outputLen;if(e.length<o)throw Error("digestInto() expects output buffer of length at least "+o)},"clean",0,function(...e){for(let t=0;t<e.length;t++)e[t].fill(0)},"concatBytes",0,function(...e){let t=0;for(let o=0;o<e.length;o++){let n=e[o];r(n),t+=n.length}let o=new Uint8Array(t);for(let t=0,r=0;t<e.length;t++){let n=e[t];o.set(n,r),r+=n.length}return o},"createHasher",0,function(e){let t=t=>e().update(a(t)).digest(),o=e();return t.outputLen=o.outputLen,t.blockLen=o.blockLen,t.create=()=>e(),t},"createView",0,function(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)},"createXOFer",0,function(e){let t=(t,o)=>e(o).update(a(t)).digest(),o=e({});return t.outputLen=o.outputLen,t.blockLen=o.blockLen,t.create=t=>e(t),t},"randomBytes",0,function(e=32){if(t&&"function"==typeof t.getRandomValues)return t.getRandomValues(new Uint8Array(e));if(t&&"function"==typeof t.randomBytes)return Uint8Array.from(t.randomBytes(e));throw Error("crypto.getRandomValues must be defined")},"rotr",0,function(e,t){return e<<32-t|e>>>t},"swap32IfBE",0,n,"toBytes",0,a,"u32",0,function(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}],28350)},53550,e=>{"use strict";var t=e.i(28350);class o extends t.Hash{constructor(e,o,r,n){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=o,this.padOffset=r,this.isLE=n,this.buffer=new Uint8Array(e),this.view=(0,t.createView)(this.buffer)}update(e){(0,t.aexists)(this),e=(0,t.toBytes)(e),(0,t.abytes)(e);let{view:o,buffer:r,blockLen:n}=this,a=e.length;for(let s=0;s<a;){let i=Math.min(n-this.pos,a-s);if(i===n){let o=(0,t.createView)(e);for(;n<=a-s;s+=n)this.process(o,s);continue}r.set(e.subarray(s,s+i),this.pos),this.pos+=i,s+=i,this.pos===n&&(this.process(o,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){(0,t.aexists)(this),(0,t.aoutput)(e,this),this.finished=!0;let{buffer:o,view:r,blockLen:n,isLE:a}=this,{pos:s}=this;o[s++]=128,(0,t.clean)(this.buffer.subarray(s)),this.padOffset>n-s&&(this.process(r,0),s=0);for(let e=s;e<n;e++)o[e]=0;!function(e,t,o,r){if("function"==typeof e.setBigUint64)return e.setBigUint64(t,o,r);let n=BigInt(32),a=BigInt(0xffffffff),s=Number(o>>n&a),i=Number(o&a),l=4*!!r,c=4*!r;e.setUint32(t+l,s,r),e.setUint32(t+c,i,r)}(r,n-8,BigInt(8*this.length),a),this.process(r,0);let i=(0,t.createView)(e),l=this.outputLen;if(l%4)throw Error("_sha2: outputLen should be aligned to 32bit");let c=l/4,p=this.get();if(c>p.length)throw Error("_sha2: outputLen bigger than state");for(let e=0;e<c;e++)i.setUint32(4*e,p[e],a)}digest(){let{buffer:e,outputLen:t}=this;this.digestInto(e);let o=e.slice(0,t);return this.destroy(),o}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:t,buffer:o,length:r,finished:n,destroyed:a,pos:s}=this;return e.destroyed=a,e.finished=n,e.length=r,e.pos=s,r%t&&e.buffer.set(o),e}clone(){return this._cloneInto()}}let r=Uint32Array.from([0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]),n=Uint32Array.from([0xc1059ed8,0x367cd507,0x3070dd17,0xf70e5939,0xffc00b31,0x68581511,0x64f98fa7,0xbefa4fa4]),a=Uint32Array.from([0xcbbb9d5d,0xc1059ed8,0x629a292a,0x367cd507,0x9159015a,0x3070dd17,0x152fecd8,0xf70e5939,0x67332667,0xffc00b31,0x8eb44a87,0x68581511,0xdb0c2e0d,0x64f98fa7,0x47b5481d,0xbefa4fa4]),s=Uint32Array.from([0x6a09e667,0xf3bcc908,0xbb67ae85,0x84caa73b,0x3c6ef372,0xfe94f82b,0xa54ff53a,0x5f1d36f1,0x510e527f,0xade682d1,0x9b05688c,0x2b3e6c1f,0x1f83d9ab,0xfb41bd6b,0x5be0cd19,0x137e2179]);var i=e.i(57047);let l=Uint32Array.from([0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0xfc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x6ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2]),c=new Uint32Array(64);class p extends o{constructor(e=32){super(64,e,8,!1),this.A=0|r[0],this.B=0|r[1],this.C=0|r[2],this.D=0|r[3],this.E=0|r[4],this.F=0|r[5],this.G=0|r[6],this.H=0|r[7]}get(){let{A:e,B:t,C:o,D:r,E:n,F:a,G:s,H:i}=this;return[e,t,o,r,n,a,s,i]}set(e,t,o,r,n,a,s,i){this.A=0|e,this.B=0|t,this.C=0|o,this.D=0|r,this.E=0|n,this.F=0|a,this.G=0|s,this.H=0|i}process(e,o){for(let t=0;t<16;t++,o+=4)c[t]=e.getUint32(o,!1);for(let e=16;e<64;e++){let o=c[e-15],r=c[e-2],n=(0,t.rotr)(o,7)^(0,t.rotr)(o,18)^o>>>3,a=(0,t.rotr)(r,17)^(0,t.rotr)(r,19)^r>>>10;c[e]=a+c[e-7]+n+c[e-16]|0}let{A:r,B:n,C:a,D:s,E:i,F:p,G:u,H:h}=this;for(let e=0;e<64;e++){var d,m,y,f;let o=h+((0,t.rotr)(i,6)^(0,t.rotr)(i,11)^(0,t.rotr)(i,25))+((d=i)&p^~d&u)+l[e]+c[e]|0,w=((0,t.rotr)(r,2)^(0,t.rotr)(r,13)^(0,t.rotr)(r,22))+((m=r)&(y=n)^m&(f=a)^y&f)|0;h=u,u=p,p=i,i=s+o|0,s=a,a=n,n=r,r=o+w|0}r=r+this.A|0,n=n+this.B|0,a=a+this.C|0,s=s+this.D|0,i=i+this.E|0,p=p+this.F|0,u=u+this.G|0,h=h+this.H|0,this.set(r,n,a,s,i,p,u,h)}roundClean(){(0,t.clean)(c)}destroy(){this.set(0,0,0,0,0,0,0,0),(0,t.clean)(this.buffer)}}class u extends p{constructor(){super(28),this.A=0|n[0],this.B=0|n[1],this.C=0|n[2],this.D=0|n[3],this.E=0|n[4],this.F=0|n[5],this.G=0|n[6],this.H=0|n[7]}}let h=i.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(e=>BigInt(e))),d=h[0],m=h[1],y=new Uint32Array(80),f=new Uint32Array(80);let w=(0,t.createHasher)(()=>new p),b=(0,t.createHasher)(()=>new u);e.s(["SHA224",0,u,"SHA256",0,p,"sha224",0,b,"sha256",0,w],53550)},98945,e=>{"use strict";var t=e.i(6158),o=e.i(933),r=e.i(62038),n=e.i(76949),a=e.i(80724);async function s(e,s){let{abi:i,address:l,args:c,functionName:p,...u}=s,h=(0,o.encodeFunctionData)({abi:i,args:c,functionName:p});try{let{data:o}=await (0,n.getAction)(e,a.call,"call")({...u,data:h,to:l});return(0,t.decodeFunctionResult)({abi:i,args:c,functionName:p,data:o||"0x"})}catch(e){throw(0,r.getContractError)(e,{abi:i,address:l,args:c,docsPath:"/docs/contract/readContract",functionName:p})}}e.s(["readContract",0,s])},23248,66886,e=>{"use strict";var t=e.i(19857),o=e.i(6158),r=e.i(933),n=e.i(96350),a=e.i(76949),s=e.i(80724);async function i(e,{address:l,blockHash:c,blockNumber:p,blockTag:u=e.experimental_blockTag??"latest",requireCanonical:h}){let d=(0,n.formatBlockParameter)({blockHash:c,blockNumber:p,blockTag:u,requireCanonical:h});if(e.batch?.multicall&&e.chain?.contracts?.multicall3){let n=e.chain.contracts.multicall3.address,i=(0,r.encodeFunctionData)({abi:t.multicall3Abi,functionName:"getEthBalance",args:[l]}),{data:d}=await (0,a.getAction)(e,s.call,"call")({to:n,data:i,blockHash:c,blockNumber:p,blockTag:u,requireCanonical:h});return(0,o.decodeFunctionResult)({abi:t.multicall3Abi,functionName:"getEthBalance",args:[l],data:d||"0x"})}return BigInt(await e.request({method:"eth_getBalance",params:[l,d]}))}e.s(["getBalance",0,i],66886);var l=e.i(36372);async function c(e,t){let{address:o,blockNumber:r,blockTag:n,chainId:a}=t,s=e.getClient({chainId:a}),c=(0,l.getAction)(s,i,"getBalance"),p=await c(r?{address:o,blockNumber:r}:{address:o,blockTag:n}),u=e.chains.find(e=>e.id===a)??s.chain;return{decimals:u.nativeCurrency.decimals,symbol:u.nativeCurrency.symbol,value:p}}var p=e.i(37372),u=e.i(51558),h=e.i(18628),d=e.i(53200);e.s(["useBalance",0,function(e={}){let t=(0,d.useConfig)(e),o=(0,h.useChainId)({config:t}),r=function(e,t={}){return{...t.query,enabled:!!(t.address&&(t.query?.enabled??!0)),queryFn:async t=>{let[,{scopeKey:o,...r}]=t.queryKey;if(!r.address)throw Error("address is required");return await c(e,{...r,address:r.address})??null},queryKey:function(e={}){return["balance",(0,p.filterQueryOptions)(e)]}(t)}}(t,{...e,chainId:e.chainId??o});return(0,u.useQuery)(r)}],23248)},79209,e=>{"use strict";var t=e.i(19857),o=e.i(26836),r=e.i(54436),n=e.i(86985),a=e.i(86433),s=e.i(91355),i=e.i(69667),l=e.i(61437),c=e.i(8951),p=e.i(87275);let u="/docs/contract/encodeErrorResult";function h(e){let{abi:t,errorName:o,args:n}=e,s=t[0];if(o){let e=(0,p.getAbiItem)({abi:t,args:n,name:o});if(!e)throw new r.AbiErrorNotFoundError(o,{docsPath:u});s=e}if("error"!==s.type)throw new r.AbiErrorNotFoundError(void 0,{docsPath:u});let h=(0,i.formatAbiItem)(s),d=(0,a.toFunctionSelector)(h),m="0x";if(n&&n.length>0){if(!s.inputs)throw new r.AbiErrorInputsNotFoundError(s.name,{docsPath:u});m=(0,c.encodeAbiParameters)(s.inputs,n)}return(0,l.concatHex)([d,m])}let d="/docs/contract/encodeFunctionResult",m="x-batch-gateway:true";async function y(e){let{data:l,ccipRequest:u}=e,{args:[f]}=function(e){let{abi:t,data:o}=e,l=(0,n.slice)(o,0,4),c=t.find(e=>"function"===e.type&&l===(0,a.toFunctionSelector)((0,i.formatAbiItem)(e)));if(!c)throw new r.AbiFunctionSignatureNotFoundError(l,{docsPath:"/docs/contract/decodeFunctionData"});return{functionName:c.name,args:"inputs"in c&&c.inputs&&c.inputs.length>0?(0,s.decodeAbiParameters)(c.inputs,(0,n.slice)(o,4)):void 0}}({abi:t.batchGatewayAbi,data:l}),w=[],b=[];return await Promise.all(f.map(async(e,r)=>{try{b[r]=e.urls.includes(m)?await y({data:e.data,ccipRequest:u}):await u(e),w[r]=!1}catch(e){var n;w[r]=!0,b[r]="HttpRequestError"===(n=e).name&&n.status?h({abi:t.batchGatewayAbi,errorName:"HttpError",args:[n.status,n.shortMessage]}):h({abi:[o.solidityError],errorName:"Error",args:["shortMessage"in n?n.shortMessage:n.message]})}})),function(e){let{abi:t,functionName:o,result:n}=e,a=t[0];if(o){let e=(0,p.getAbiItem)({abi:t,name:o});if(!e)throw new r.AbiFunctionNotFoundError(o,{docsPath:d});a=e}if("function"!==a.type)throw new r.AbiFunctionNotFoundError(void 0,{docsPath:d});if(!a.outputs)throw new r.AbiFunctionOutputsNotFoundError(a.name,{docsPath:d});let s=(()=>{if(0===a.outputs.length)return[];if(1===a.outputs.length)return[n];if(Array.isArray(n))return n;throw new r.InvalidArrayError(n)})();return(0,c.encodeAbiParameters)(a.outputs,s)}({abi:t.batchGatewayAbi,functionName:"query",result:[w,b]})}e.s(["localBatchGatewayRequest",0,y,"localBatchGatewayUrl",0,m],79209)},47177,e=>{"use strict";var t=`{
  "connect_wallet": {
    "label": "Connect Wallet",
    "wrong_network": {
      "label": "Wrong network"
    }
  },

  "intro": {
    "title": "What is a Wallet?",
    "description": "A wallet is used to send, receive, store, and display digital assets. It's also a new way to log in, without needing to create new accounts and passwords on every website.",
    "digital_asset": {
      "title": "A Home for your Digital Assets",
      "description": "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."
    },
    "login": {
      "title": "A New Way to Log In",
      "description": "Instead of creating new accounts and passwords on every website, just connect your wallet."
    },
    "get": {
      "label": "Get a Wallet"
    },
    "learn_more": {
      "label": "Learn More"
    }
  },

  "sign_in": {
    "label": "Verify your account",
    "description": "To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account.",
    "message": {
      "send": "Sign message",
      "preparing": "Preparing message...",
      "cancel": "Cancel",
      "preparing_error": "Error preparing message, please retry!"
    },
    "signature": {
      "waiting": "Waiting for signature...",
      "verifying": "Verifying signature...",
      "signing_error": "Error signing message, please retry!",
      "verifying_error": "Error verifying signature, please retry!",
      "oops_error": "Oops, something went wrong!"
    }
  },

  "connect": {
    "label": "Connect",
    "title": "Connect a Wallet",
    "new_to_ethereum": {
      "description": "New to Ethereum wallets?",
      "learn_more": {
        "label": "Learn More"
      }
    },
    "learn_more": {
      "label": "Learn more"
    },
    "recent": "Recent",
    "status": {
      "opening": "Opening %{wallet}...",
      "connecting": "Connecting",
      "connect_mobile": "Continue in %{wallet}",
      "not_installed": "%{wallet} is not installed",
      "not_available": "%{wallet} is not available",
      "confirm": "Confirm connection in the extension",
      "confirm_mobile": "Accept connection request in the wallet"
    },
    "secondary_action": {
      "get": {
        "description": "Don't have %{wallet}?",
        "label": "GET"
      },
      "install": {
        "label": "INSTALL"
      },
      "retry": {
        "label": "RETRY"
      }
    },
    "walletconnect": {
      "description": {
        "full": "Need the official WalletConnect modal?",
        "compact": "Need the WalletConnect modal?"
      },
      "open": {
        "label": "OPEN"
      }
    }
  },

  "connect_scan": {
    "title": "Scan with %{wallet}",
    "fallback_title": "Scan with your phone"
  },

  "connector_group": {
    "installed": "Installed",
    "recommended": "Recommended",
    "other": "Other",
    "popular": "Popular",
    "more": "More",
    "others": "Others"
  },

  "get": {
    "title": "Get a Wallet",
    "action": {
      "label": "GET"
    },
    "mobile": {
      "description": "Mobile Wallet"
    },
    "extension": {
      "description": "Browser Extension"
    },
    "mobile_and_extension": {
      "description": "Mobile Wallet and Extension"
    },
    "mobile_and_desktop": {
      "description": "Mobile and Desktop Wallet"
    },
    "looking_for": {
      "title": "Not what you're looking for?",
      "mobile": {
        "description": "Select a wallet on the main screen to get started with a different wallet provider."
      },
      "desktop": {
        "compact_description": "Select a wallet on the main screen to get started with a different wallet provider.",
        "wide_description": "Select a wallet on the left to get started with a different wallet provider."
      }
    }
  },

  "get_options": {
    "title": "Get started with %{wallet}",
    "short_title": "Get %{wallet}",
    "mobile": {
      "title": "%{wallet} for Mobile",
      "description": "Use the mobile wallet to explore the world of Ethereum.",
      "download": {
        "label": "Get the app"
      }
    },
    "extension": {
      "title": "%{wallet} for %{browser}",
      "description": "Access your wallet right from your favorite web browser.",
      "download": {
        "label": "Add to %{browser}"
      }
    },
    "desktop": {
      "title": "%{wallet} for %{platform}",
      "description": "Access your wallet natively from your powerful desktop.",
      "download": {
        "label": "Add to %{platform}"
      }
    }
  },

  "get_mobile": {
    "title": "Install %{wallet}",
    "description": "Scan with your phone to download on iOS or Android",
    "continue": {
      "label": "Continue"
    }
  },

  "get_instructions": {
    "mobile": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "extension": {
      "refresh": {
        "label": "Refresh"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "desktop": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    }
  },

  "chains": {
    "title": "Switch Networks",
    "wrong_network": "Wrong network detected, switch or disconnect to continue.",
    "confirm": "Confirm in Wallet",
    "switching_not_supported": "Your wallet does not support switching networks from %{appName}. Try switching networks from within your wallet instead.",
    "switching_not_supported_fallback": "Your wallet does not support switching networks from this app. Try switching networks from within your wallet instead.",
    "disconnect": "Disconnect",
    "connected": "Connected"
  },

  "profile": {
    "disconnect": {
      "label": "Disconnect"
    },
    "copy_address": {
      "label": "Copy Address",
      "copied": "Copied!"
    },
    "explorer": {
      "label": "View more on explorer"
    },
    "transactions": {
      "description": "%{appName} transactions will appear here...",
      "description_fallback": "Your transactions will appear here...",
      "recent": {
        "title": "Recent Transactions"
      },
      "clear": {
        "label": "Clear All"
      }
    }
  },

  "wallet_connectors": {
    "ready": {
      "qr_code": {
        "step1": {
          "description": "Add Ready to your home screen for faster access to your wallet.",
          "title": "Open the Ready app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "berasig": {
      "extension": {
        "step1": {
          "title": "Install the BeraSig extension",
          "description": "We recommend pinning BeraSig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "best": {
      "qr_code": {
        "step1": {
          "title": "Open the Best Wallet app",
          "description": "Add Best Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bifrost": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bifrost Wallet on your home screen for quicker access.",
          "title": "Open the Bifrost Wallet app"
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "bitget": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bitget Wallet on your home screen for quicker access.",
          "title": "Open the Bitget Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Bitget Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitget Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitski": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Bitski to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitski extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitverse": {
      "qr_code": {
        "step1": {
          "title": "Open the Bitverse Wallet app",
          "description": "Add Bitverse Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bloom": {
      "desktop": {
        "step1": {
          "title": "Open the Bloom Wallet app",
          "description": "We recommend putting Bloom Wallet on your home screen for quicker access."
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you have a wallet, click on Connect to connect via Bloom. A connection prompt in the app will appear for you to confirm the connection.",
          "title": "Click on Connect"
        }
      }
    },

    "bybit": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bybit on your home screen for faster access to your wallet.",
          "title": "Open the Bybit app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Bybit Wallet for easy access.",
          "title": "Install the Bybit Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Bybit Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "binance": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Binance on your home screen for faster access to your wallet.",
          "title": "Open the Binance app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Binance Wallet extension",
          "description": "We recommend pinning Binance Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "coin98": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coin98 Wallet on your home screen for faster access to your wallet.",
          "title": "Open the Coin98 Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Coin98 Wallet for easy access.",
          "title": "Install the Coin98 Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Coin98 Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "coinbase": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coinbase Wallet on your home screen for quicker access.",
          "title": "Open the Coinbase Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Coinbase Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "compass": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Compass Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Compass Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "core": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Core on your home screen for faster access to your wallet.",
          "title": "Open the Core app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Core to your taskbar for quicker access to your wallet.",
          "title": "Install the Core extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "fox": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting FoxWallet on your home screen for quicker access.",
          "title": "Open the FoxWallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "frontier": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Frontier Wallet on your home screen for quicker access.",
          "title": "Open the Frontier Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Frontier Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Frontier Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "im_token": {
      "qr_code": {
        "step1": {
          "title": "Open the imToken app",
          "description": "Put imToken app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "iopay": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting ioPay on your home screen for faster access to your wallet.",
          "title": "Open the ioPay app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      }
    },

    "kaikas": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaikas to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaikas extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaikas app",
          "description": "Put Kaikas app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kaia": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaia to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaia extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaia app",
          "description": "Put Kaia app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kraken": {
      "qr_code": {
        "step1": {
          "title": "Open the Kraken Wallet app",
          "description": "Add Kraken Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "kresus": {
      "qr_code": {
        "step1": {
          "title": "Open the Kresus Wallet app",
          "description": "Add Kresus Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "magicEden": {
      "extension": {
        "step1": {
          "title": "Install the Magic Eden extension",
          "description": "We recommend pinning Magic Eden to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "metamask": {
      "qr_code": {
        "step1": {
          "title": "Open the MetaMask app",
          "description": "We recommend putting MetaMask on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the MetaMask extension",
          "description": "We recommend pinning MetaMask to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "nestwallet": {
      "extension": {
        "step1": {
          "title": "Install the NestWallet extension",
          "description": "We recommend pinning NestWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "okx": {
      "qr_code": {
        "step1": {
          "title": "Open the OKX Wallet app",
          "description": "We recommend putting OKX Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the OKX Wallet extension",
          "description": "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "omni": {
      "qr_code": {
        "step1": {
          "title": "Open the Omni app",
          "description": "Add Omni to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your home screen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "1inch": {
      "qr_code": {
        "step1": {
          "description": "Put 1inch Wallet on your home screen for faster access to your wallet.",
          "title": "Open the 1inch Wallet app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "token_pocket": {
      "qr_code": {
        "step1": {
          "title": "Open the TokenPocket app",
          "description": "We recommend putting TokenPocket on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the TokenPocket extension",
          "description": "We recommend pinning TokenPocket to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "trust": {
      "qr_code": {
        "step1": {
          "title": "Open the Trust Wallet app",
          "description": "Put Trust Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Trust Wallet extension",
          "description": "Click at the top right of your browser and pin Trust Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up Trust Wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "uniswap": {
      "qr_code": {
        "step1": {
          "title": "Open the Uniswap app",
          "description": "Add Uniswap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "zerion": {
      "qr_code": {
        "step1": {
          "title": "Open the Zerion app",
          "description": "We recommend putting Zerion on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Zerion extension",
          "description": "We recommend pinning Zerion to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rainbow": {
      "qr_code": {
        "step1": {
          "title": "Open the Rainbow app",
          "description": "We recommend putting Rainbow on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "You can easily backup your wallet using our backup feature on your phone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "enkrypt": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Enkrypt Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "frame": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Frame to your taskbar for quicker access to your wallet.",
          "title": "Install Frame & the companion extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "one_key": {
      "extension": {
        "step1": {
          "title": "Install the OneKey Wallet extension",
          "description": "We recommend pinning OneKey Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "paraswap": {
      "qr_code": {
        "step1": {
          "title": "Open the ParaSwap app",
          "description": "Add ParaSwap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "phantom": {
      "extension": {
        "step1": {
          "title": "Install the Phantom extension",
          "description": "We recommend pinning Phantom to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rabby": {
      "extension": {
        "step1": {
          "title": "Install the Rabby extension",
          "description": "We recommend pinning Rabby to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "ronin": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Ronin Wallet on your home screen for quicker access.",
          "title": "Open the Ronin Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Ronin Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Ronin Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "ramper": {
      "extension": {
        "step1": {
          "title": "Install the Ramper extension",
          "description": "We recommend pinning Ramper to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safeheron": {
      "extension": {
        "step1": {
          "title": "Install the Core extension",
          "description": "We recommend pinning Safeheron to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "taho": {
      "extension": {
        "step1": {
          "title": "Install the Taho extension",
          "description": "We recommend pinning Taho to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "wigwam": {
      "extension": {
        "step1": {
          "title": "Install the Wigwam extension",
          "description": "We recommend pinning Wigwam to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "talisman": {
      "extension": {
        "step1": {
          "title": "Install the Talisman extension",
          "description": "We recommend pinning Talisman to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import an Ethereum Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "ctrl": {
      "extension": {
        "step1": {
          "title": "Install the CTRL Wallet extension",
          "description": "We recommend pinning CTRL Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "zeal": {
      "qr_code": {
        "step1": {
          "title": "Open the Zeal app",
          "description": "Add Zeal Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Zeal extension",
          "description": "We recommend pinning Zeal to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safepal": {
      "extension": {
        "step1": {
          "title": "Install the SafePal Wallet extension",
          "description": "Click at the top right of your browser and pin SafePal Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up SafePal Wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SafePal Wallet app",
          "description": "Put SafePal Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "desig": {
      "extension": {
        "step1": {
          "title": "Install the Desig extension",
          "description": "We recommend pinning Desig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "subwallet": {
      "extension": {
        "step1": {
          "title": "Install the SubWallet extension",
          "description": "We recommend pinning SubWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SubWallet app",
          "description": "We recommend putting SubWallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "clv": {
      "extension": {
        "step1": {
          "title": "Install the CLV Wallet extension",
          "description": "We recommend pinning CLV Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the CLV Wallet app",
          "description": "We recommend putting CLV Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "okto": {
      "qr_code": {
        "step1": {
          "title": "Open the Okto app",
          "description": "Add Okto to your home screen for quick access"
        },
        "step2": {
          "title": "Create an MPC Wallet",
          "description": "Create an account and generate a wallet"
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Tap the Scan QR icon at the top right and confirm the prompt to connect."
        }
      }
    },

    "ledger": {
      "desktop": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "Set up a new Ledger or connect to an existing one."
        },
        "step3": {
          "title": "Connect",
          "description": "A connection prompt will appear for you to connect your wallet."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "You can either sync with the desktop app or connect your Ledger."
        },
        "step3": {
          "title": "Scan the code",
          "description": "Tap WalletConnect then Switch to Scanner. After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "valora": {
      "qr_code": {
        "step1": {
          "title": "Open the Valora app",
          "description": "We recommend putting Valora on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "gate": {
      "qr_code": {
        "step1": {
          "title": "Open the Gate app",
          "description": "We recommend putting Gate on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Gate extension",
          "description": "We recommend pinning Gate to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "gemini": {
      "qr_code": {
        "step1": {
          "title": "Open keys.gemini.com",
          "description": "Visit keys.gemini.com on your mobile browser - no app download required."
        },
        "step2": {
          "title": "Create Your Wallet Instantly",
          "description": "Set up your smart wallet in seconds using your device's built-in authentication."
        },
        "step3": {
          "title": "Scan to Connect",
          "description": "Scan the QR code to instantly connect your wallet - it just works."
        }
      },
      "extension": {
        "step1": {
          "title": "Go to keys.gemini.com",
          "description": "No extensions or downloads needed - your wallet lives securely in the browser."
        },
        "step2": {
          "title": "One-Click Setup",
          "description": "Create your smart wallet instantly with passkey authentication - easier than any wallet out there."
        },
        "step3": {
          "title": "Connect and Go",
          "description": "Approve the connection and you're ready - the unopinionated wallet that just works."
        }
      }
    },

    "xportal": {
      "qr_code": {
        "step1": {
          "description": "Put xPortal on your home screen for faster access to your wallet.",
          "title": "Open the xPortal app"
        },
        "step2": {
          "description": "Create a wallet or import an existing one.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "mew": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting MEW Wallet on your home screen for quicker access.",
          "title": "Open the MEW Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "zilpay": {
      "qr_code": {
        "step1": {
          "title": "Open the ZilPay app",
          "description": "Add ZilPay to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "nova": {
      "qr_code": {
        "step1": {
          "title": "Open the Nova Wallet app",
          "description": "Add Nova Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "meco": {
      "qr_code": {
        "step1": {
          "title": "Open the MeCo Wallet app",
          "description": "Put MeCo Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "anchorage_digital": {
      "extension": {
        "step1": {
          "title": "Install the Anchorage Digital extension",
          "description": "We recommend pinning Anchorage Digital to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Scan the QR code to login",
          "description": "Securely connect your organization's wallets to dApps with institutional-grade security."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you log in, click below to refresh the browser and load up the extension."
        }
      }
    }
  }
}
`;e.s(["en_US_default",0,t])},38146,e=>{e.v(t=>Promise.all(["static/chunks/0cczc65dvurb~.js"].map(t=>e.l(t))).then(()=>t(91724)))},67743,e=>{e.v(e=>Promise.resolve().then(()=>e(3316)))},56621,e=>{e.v(t=>Promise.all(["static/chunks/16vfs9h6wj51a.js"].map(t=>e.l(t))).then(()=>t(44190)))},48940,e=>{e.v(t=>Promise.all(["static/chunks/0sia9yt8f8-4n.js"].map(t=>e.l(t))).then(()=>t(46706)))},64268,e=>{e.v(t=>Promise.all(["static/chunks/0_.hfiwmk8jpp.js"].map(t=>e.l(t))).then(()=>t(13202)))},54999,e=>{e.v(t=>Promise.all(["static/chunks/0os4.cfsmbjul.js"].map(t=>e.l(t))).then(()=>t(10477)))},75429,e=>{e.v(t=>Promise.all(["static/chunks/0_o2pip6ec9am.js"].map(t=>e.l(t))).then(()=>t(85654)))},51837,e=>{e.v(t=>Promise.all(["static/chunks/164s40bjigg01.js"].map(t=>e.l(t))).then(()=>t(93683)))},45394,e=>{e.v(t=>Promise.all(["static/chunks/0vk7n9y1vug4u.js"].map(t=>e.l(t))).then(()=>t(39441)))},10580,e=>{e.v(t=>Promise.all(["static/chunks/06e5c5k9jmzro.js"].map(t=>e.l(t))).then(()=>t(15109)))},59402,e=>{e.v(t=>Promise.all(["static/chunks/034alfm0g35.~.js"].map(t=>e.l(t))).then(()=>t(59789)))},29067,e=>{e.v(t=>Promise.all(["static/chunks/0aza8311-xgh0.js"].map(t=>e.l(t))).then(()=>t(84930)))},51264,e=>{e.v(t=>Promise.all(["static/chunks/0pi9m9pcqf7cj.js"].map(t=>e.l(t))).then(()=>t(2220)))},40677,e=>{e.v(t=>Promise.all(["static/chunks/05x0snsavj_y6.js"].map(t=>e.l(t))).then(()=>t(48701)))},79400,e=>{e.v(t=>Promise.all(["static/chunks/18bt~y~17yjqx.js"].map(t=>e.l(t))).then(()=>t(26859)))},47729,e=>{e.v(t=>Promise.all(["static/chunks/0d3guw6dk1~.7.js"].map(t=>e.l(t))).then(()=>t(87605)))},94307,e=>{e.v(t=>Promise.all(["static/chunks/0jcvugdnb6h5f.js"].map(t=>e.l(t))).then(()=>t(52810)))},79711,e=>{e.v(t=>Promise.all(["static/chunks/0~dp5rgobr8hm.js"].map(t=>e.l(t))).then(()=>t(89541)))},51671,e=>{e.v(t=>Promise.all(["static/chunks/0yb-ky0hk0dg6.js"].map(t=>e.l(t))).then(()=>t(29e3)))},77240,e=>{e.v(t=>Promise.all(["static/chunks/13kabz3z-qq3a.js"].map(t=>e.l(t))).then(()=>t(31254)))},63244,e=>{e.v(t=>Promise.all(["static/chunks/0y4w.hpeq0s_s.js"].map(t=>e.l(t))).then(()=>t(343)))},65231,e=>{e.v(t=>Promise.all(["static/chunks/0_61al-svqq_-.js"].map(t=>e.l(t))).then(()=>t(72370)))},23047,e=>{e.v(t=>Promise.all(["static/chunks/07g89~rq0v1hs.js"].map(t=>e.l(t))).then(()=>t(26073)))},87009,e=>{e.v(t=>Promise.all(["static/chunks/04w1jfw3~tqqx.js"].map(t=>e.l(t))).then(()=>t(35840)))},34188,e=>{e.v(t=>Promise.all(["static/chunks/0cjl~47-0f.e4.js"].map(t=>e.l(t))).then(()=>t(61505)))},99894,e=>{e.v(t=>Promise.all(["static/chunks/0o.mxvswh5g48.js"].map(t=>e.l(t))).then(()=>t(93047)))},17590,e=>{e.v(t=>Promise.all(["static/chunks/16vjs65mmm9xe.js"].map(t=>e.l(t))).then(()=>t(7796)))},39297,e=>{e.v(t=>Promise.all(["static/chunks/0pmvhzrmrsk~u.js"].map(t=>e.l(t))).then(()=>t(52518)))},75322,e=>{e.v(t=>Promise.all(["static/chunks/04ye_x.s311d2.js"].map(t=>e.l(t))).then(()=>t(75786)))},27895,e=>{e.v(t=>Promise.all(["static/chunks/0.9dh_z6~wx3q.js"].map(t=>e.l(t))).then(()=>t(54622)))},63538,e=>{e.v(t=>Promise.all(["static/chunks/0v5jpni3gybtz.js"].map(t=>e.l(t))).then(()=>t(85489)))},16839,e=>{e.v(t=>Promise.all(["static/chunks/08g4w~n8mv5mz.js"].map(t=>e.l(t))).then(()=>t(89732)))},75368,e=>{e.v(t=>Promise.all(["static/chunks/0~__t0s~xyzyt.js"].map(t=>e.l(t))).then(()=>t(34532)))},16089,e=>{e.v(t=>Promise.all(["static/chunks/0l8cwwdba2se5.js"].map(t=>e.l(t))).then(()=>t(70272)))},51758,e=>{e.v(t=>Promise.all(["static/chunks/0-icvuz0z.~6s.js"].map(t=>e.l(t))).then(()=>t(54802)))},55686,e=>{e.v(t=>Promise.all(["static/chunks/041_cjod7j2uw.js"].map(t=>e.l(t))).then(()=>t(92988)))},92171,e=>{e.v(t=>Promise.all(["static/chunks/0rm5013jni-sk.js"].map(t=>e.l(t))).then(()=>t(82880)))},35417,e=>{e.v(t=>Promise.all(["static/chunks/0xqolb5s6h-ry.js"].map(t=>e.l(t))).then(()=>t(72614)))},25567,e=>{e.v(t=>Promise.all(["static/chunks/11_-ygvfliidt.js"].map(t=>e.l(t))).then(()=>t(58567)))},66464,e=>{e.v(t=>Promise.all(["static/chunks/165-2iomjj7-..js"].map(t=>e.l(t))).then(()=>t(30709)))},79573,e=>{e.v(t=>Promise.all(["static/chunks/14~q~yw.jzm_y.js"].map(t=>e.l(t))).then(()=>t(3951)))},20714,e=>{e.v(t=>Promise.all(["static/chunks/0t0psz6sented.js"].map(t=>e.l(t))).then(()=>t(37101)))},70662,e=>{e.v(t=>Promise.all(["static/chunks/05afv31_o~or..js"].map(t=>e.l(t))).then(()=>t(18521)))},70179,e=>{e.v(t=>Promise.all(["static/chunks/0b1o40r2gjg6~.js"].map(t=>e.l(t))).then(()=>t(57453)))},52505,e=>{e.v(t=>Promise.all(["static/chunks/08lsub~2mi.1o.js"].map(t=>e.l(t))).then(()=>t(35697)))},56265,e=>{e.v(t=>Promise.all(["static/chunks/0htfhy9_dfs8~.js"].map(t=>e.l(t))).then(()=>t(97107)))},4513,e=>{e.v(t=>Promise.all(["static/chunks/09.c6l.iiy2p-.js"].map(t=>e.l(t))).then(()=>t(70963)))},75173,e=>{e.v(t=>Promise.all(["static/chunks/17nsqsuyloaf_.js"].map(t=>e.l(t))).then(()=>t(13250)))},75654,e=>{e.v(t=>Promise.all(["static/chunks/02mx_pp4ywd.d.js"].map(t=>e.l(t))).then(()=>t(89090)))},379,e=>{e.v(t=>Promise.all(["static/chunks/12e9tvknv8wyi.js"].map(t=>e.l(t))).then(()=>t(36833)))},60085,e=>{e.v(t=>Promise.all(["static/chunks/0xhlx._mcvuel.js"].map(t=>e.l(t))).then(()=>t(64513)))},3499,e=>{e.v(t=>Promise.all(["static/chunks/0p43gjf096pdf.js"].map(t=>e.l(t))).then(()=>t(10419)))},12811,e=>{e.v(t=>Promise.all(["static/chunks/0zs3._c9cb-1w.js"].map(t=>e.l(t))).then(()=>t(58632)))},97745,e=>{e.v(t=>Promise.all(["static/chunks/0lqtoa2sjc~9u.js"].map(t=>e.l(t))).then(()=>t(31677)))},42483,e=>{e.v(t=>Promise.all(["static/chunks/01rvcf.y5kdnv.js"].map(t=>e.l(t))).then(()=>t(42890)))},42017,e=>{e.v(t=>Promise.all(["static/chunks/0wvhec3uhlx-g.js"].map(t=>e.l(t))).then(()=>t(33154)))},34216,e=>{e.v(t=>Promise.all(["static/chunks/0s~lr6acjjxcx.js"].map(t=>e.l(t))).then(()=>t(71609)))},22524,e=>{e.v(t=>Promise.all(["static/chunks/0mdv-em2d3jb..js"].map(t=>e.l(t))).then(()=>t(28201)))},51239,e=>{e.v(t=>Promise.all(["static/chunks/05jyktqyoojs~.js"].map(t=>e.l(t))).then(()=>t(82393)))},64661,e=>{e.v(t=>Promise.all(["static/chunks/03mio6672l8wf.js"].map(t=>e.l(t))).then(()=>t(25761)))},9320,e=>{e.v(t=>Promise.all(["static/chunks/0tq0n~pe7fbcs.js"].map(t=>e.l(t))).then(()=>t(4417)))},18668,e=>{e.v(t=>Promise.all(["static/chunks/03-lsav.q.vsi.js"].map(t=>e.l(t))).then(()=>t(24009)))},31315,e=>{e.v(t=>Promise.all(["static/chunks/033__7sjr1rqv.js"].map(t=>e.l(t))).then(()=>t(82113)))},38500,e=>{e.v(t=>Promise.all(["static/chunks/0u70qzzljvh7d.js"].map(t=>e.l(t))).then(()=>t(84929)))},46599,e=>{e.v(t=>Promise.all(["static/chunks/05h3mpb320c7r.js"].map(t=>e.l(t))).then(()=>t(11535)))},65616,e=>{e.v(t=>Promise.all(["static/chunks/02b~9ifl3hdx5.js"].map(t=>e.l(t))).then(()=>t(42497)))},71843,e=>{e.v(t=>Promise.all(["static/chunks/0.6pcfg9ppfxc.js"].map(t=>e.l(t))).then(()=>t(91383)))},15814,e=>{e.v(t=>Promise.all(["static/chunks/09g7i10wh~d92.js"].map(t=>e.l(t))).then(()=>t(30271)))},95357,e=>{e.v(t=>Promise.all(["static/chunks/0l7f3a1xjqlf2.js"].map(t=>e.l(t))).then(()=>t(29173)))},50673,e=>{e.v(t=>Promise.all(["static/chunks/13bm~m5onaxc5.js"].map(t=>e.l(t))).then(()=>t(13764)))},89034,e=>{e.v(t=>Promise.all(["static/chunks/0h4xwyk.z4~iw.js"].map(t=>e.l(t))).then(()=>t(76617)))},78652,e=>{e.v(t=>Promise.all(["static/chunks/0p-mfzdvttp9l.js"].map(t=>e.l(t))).then(()=>t(22636)))},34824,e=>{e.v(t=>Promise.all(["static/chunks/0m4ug_a7tlveo.js"].map(t=>e.l(t))).then(()=>t(1448)))},57736,e=>{e.v(t=>Promise.all(["static/chunks/0yj0bfim~8m8-.js"].map(t=>e.l(t))).then(()=>t(45848)))},75774,e=>{e.v(t=>Promise.all(["static/chunks/0mrxpiy_n7vx7.js"].map(t=>e.l(t))).then(()=>t(42396)))},75438,e=>{e.v(t=>Promise.all(["static/chunks/030vaq0ukzct3.js"].map(t=>e.l(t))).then(()=>t(12e3)))},24083,e=>{e.v(t=>Promise.all(["static/chunks/0.-2zs1.9msdf.js"].map(t=>e.l(t))).then(()=>t(53886)))}]);