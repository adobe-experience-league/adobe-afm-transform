!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).afm={})}(this,(function(e){"use strict";function t(e=""){return e.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g,"\\$&")}function n(e="",t="",n=[],r=0){let i=0,s=r;const o=n.filter((t=>t.includes(e))).map((n=>{const r=t.indexOf(n,i)+n.indexOf(e);return r>i&&(i=r),r}));if(o.includes(s))for(;o.includes(s);)s=t.indexOf(e,s+1);return s}e.afm=function(e="",r="extension",i=((e="")=>e),s={},o={}){const l=e.includes("\r")?"\r\n":"\n",c={skip:new Map,vids:new Map},f=Array.from(new Set(e.match(/\&#\w+;/g)||[])),a=f.map((e=>escape(e))),p=e.split(/(?<!`|>)`{3,3}(?!`)/g),d=p.filter(((e,t)=>t%2==1)).map((e=>`\`\`\`${e}\`\`\``)),u=p.filter(((e,t)=>t%2==0)).map((e=>e.replace(/(^[\r?\n]+|[\r?\n]+$)/g,""))).join(l),g=f.reduce(((e,n)=>e.replace(new RegExp(t(n),"g"),escape(n))),u),$=g.match(/(?!\r?\n)(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g)||[],m=Object.keys(s).filter((e=>"VIDEO"===s[e]))[0]||"VIDEO",h=g.match(new RegExp(`\\>\\[\\!${m}\\]\\((.*)\\)`,"g"))||[];let x=function(e=""){return JSON.parse(JSON.stringify(e))}(e);for(const t of d.values()){const n=e.indexOf(t),r=n+t.length;c.skip.set(t,{start:n,end:r})}const v=Array.from(c.skip.values());for(const n of h.values()){const r=Array.from(e.matchAll(new RegExp(t(n),"g"))).filter((e=>{let t=!0;if(c.skip.size>0){const n=e.index;t=0===v.filter((e=>n>=e.start&&n<e.end)).length}return t})).map((e=>({start:e.index,end:e.index+e[0].length})));c.vids.set(n,r)}for(const e of $){const c=e.split(/\r?\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),p=(c[0].match(/\>\[\!(.*)\]/)||[])[1]||"",u=c[0].replace(/\>\[.*/,""),g=`${l}${u}`,$=`${u}${i(c.slice(1,c.length).map((e=>{let n=e.replace(/^(\s+|\t+)?\>/,"").trimEnd();for(const e of f)n.includes(e)&&(n=n.replace(new RegExp(t(e),"g"),escape(e)));return n})).filter(((e,t)=>0!==t||e.length>0)).join(l).trim()).split(/\r?\n/).join(g)}`,m=(p in s?s[p]:p).toLowerCase().replace(/\s/g,""),h=c.map((e=>{let n=e;for(const e of a)n.includes(e)&&(n=n.replace(new RegExp(t(e),"g"),unescape(e)));return n})).join(l);let v=x.indexOf(h);d.length>0&&(v=n(h,x,d,v)),x=`${x.slice(0,v)}${u}<div class="${r} ${m}">${g}<div>${p in o?o[p]:p}</div>${g}<div>${l}${$.replace(/\r?\n$/,"")}${g}</div>${g}</div>${g}${x.slice(v+h.length)}`}for(const e of h){const t=e.replace(/^.*\(|\).*$/g,"");let i=x.indexOf(e);d.length>0&&(i=n(e,x,d,i)),x=`${x.slice(0,i)}<div class="${r} video"><iframe allowfullscreen embedded-video src="${t}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="${t}" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>${x.slice(i+e.length)}`}for(const e of a)x=x.replace(new RegExp(t(e),"g"),unescape(e));return x.trim()},Object.defineProperty(e,"__esModule",{value:!0})}));