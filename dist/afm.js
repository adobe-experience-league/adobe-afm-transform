!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).afm={})}(this,(function(e){"use strict";function n(e=""){return JSON.parse(JSON.stringify(e))}function t(e=""){return e.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g,"\\$&")}function r(e="",n="",t=[],r=0){let i=0,s=r;const c=t.filter((n=>n.includes(e))).map((t=>{const r=n.indexOf(t,i)+t.indexOf(e);return r>i&&(i=r),r}));if(c.includes(s))for(;c.includes(s);)s=n.indexOf(e,s+1);return s}e.afm=function(e="",i="extension",s=((e="")=>e),c={},o={}){const l=e.includes("\r")?"\r\n":"\n",f=e.match(/(?<!\\|\>\s*)```[^```]+\\?```(\r?\n)?/g)||[],p=Array.from(new Set(e.match(/\&#\w+;/g)||[])),a=p.map((e=>escape(e))),d=f.reduce(((e,n)=>e.replace(n,"")),n(e)),u=p.reduce(((e,n)=>e.replace(new RegExp(t(n),"g"),escape(n))),d).match(/(?!\r?\n)(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g)||[],g=Object.keys(c).filter((e=>"VIDEO"===c[e]))[0]||"VIDEO",$=e.match(new RegExp(`(?!\\r?\\n)(\\s+|\\t+)?\\>\\[\\!${g}\\]\\((.*)\\)`,"g"))||[];let m=n(e);for(const e of u){const n=e.split(/\r?\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),d=(n[0].match(/\>\[\!(.*)\]/)||[])[1]||"",u=n[0].replace(/\>\[.*/,""),g=`${l}${u}`,$=`${u}${s(n.slice(1,n.length).map((e=>{let n=e.replace(/^(\s+|\t+)?\>/,"").trim();for(const e of p)n.includes(e)&&(n=n.replace(new RegExp(t(e),"g"),escape(e)));return n})).filter(((e,n)=>0!==n||e.length>0)).join(l).trim()).split(/\r?\n/).join(g)}`,h=(d in c?c[d]:d).toLowerCase().replace(/\s/g,""),x=n.map((e=>{let n=e;for(const e of a)n.includes(e)&&(n=n.replace(new RegExp(t(e),"g"),unescape(e)));return n})).join(l);let v=m.indexOf(x);f.length>0&&(v=r(x,m,f,v)),m=`${m.slice(0,v)}${u}<div class="${i} ${h}">${g}<div>${d in o?o[d]:d}</div>${g}<div>${l}${$.replace(/\r?\n$/,"")}${g}</div>${g}</div>${g}${m.slice(v+x.length)}`}for(const e of $){const n=e.replace(/^.*\(|\).*$/g,"");let t=m.indexOf(e);f.length>0&&(t=r(e,m,f,t)),m=`${m.slice(0,t)}<div class="${i} video"><iframe allowfullscreen embedded-video src="${n}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="${n}" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>${m.slice(t+e.length)}`}for(const e of a)m=m.replace(new RegExp(t(e),"g"),unescape(e));return m.trim()},Object.defineProperty(e,"__esModule",{value:!0})}));