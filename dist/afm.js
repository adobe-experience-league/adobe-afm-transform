!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).afm={})}(this,(function(e){"use strict";function t(e=""){return e.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g,"\\$&")}function n(e="",t="",n=[],r=0){let i=0,o=r;const c=n.filter((t=>t.includes(e))).map((n=>{const r=t.indexOf(n,i)+n.indexOf(e);return r>i&&(i=r),r}));if(c.includes(o))for(;c.includes(o);)o=t.indexOf(e,o+1);return o}e.afm=function(e="",r="extension",i=((e="")=>e),o={},c={}){const l=e.includes("\r")?"\r\n":"\n",s=Array.from(new Set(e.match(/\&#\w+;/g)||[])),f=s.map((e=>escape(e))),p=e.split(/(?<!`|>)`{3,3}(?!`)/g).filter(((e,t)=>t%2==1)).map((e=>`\`\`\`${e}\`\`\``)),a=e.match(/\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g)||[],d=Object.keys(o).filter((e=>"VIDEO"===o[e]))[0]||"VIDEO";let u=function(e=""){return JSON.parse(JSON.stringify(e))}(e),$=u;p.forEach((e=>{$=$.replace(e,"")}));const g=$.match(new RegExp(`\\>\\[\\!${d}\\]\\((.*)\\)`,"g"))||[];for(const e of a){let n=e;const f=p.filter((t=>e.includes(t)));if(f.length>0)for(const e of f)n=n.replace(e,`[AFMSKIP]${e.replace(/(^`{3,3}|`{3,3}$)/g,"")}[/AFMSKIP]`);const a=n.split(/\r?\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),d=(a[0].match(/\>\[\!(.*)\]/)||[])[1]||"",$=a[1].replace(/\>.*/,""),g=`${l}${$}`,m=`${$}${i(a.slice(1,a.length).map((e=>{let n=e.replace(/^(\s+|\t+)?\>/,"").trimEnd();for(const e of s)n.includes(e)&&(n=n.replace(new RegExp(t(e),"g"),escape(e)));return n})).filter(((e,t)=>0!==t||e.length>0)).join(l).trim()).split(/\r?\n/).join(g)}`,h=`<div class="${r} ${(d in o?o[d]:d).toLowerCase().replace(/\s/g,"")}">${g}<div>${d in c?c[d]:d}</div>${g}<div>${l}${m.replace(/\r?\n$/,"").trimEnd()}${g}</div>${g}</div>${g}`;u=u.replace(e,h)}for(const e of g){const t=e.replace(/^.*\(|\).*$/g,"");let i=u.indexOf(e);p.length>0&&(i=n(e,u,p,i)),u=`${u.slice(0,i)}<div class="${r} video"><iframe allowfullscreen embedded-video src="${t}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="${t}" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>${u.slice(i+e.length)}`}for(const e of f)u=u.replace(new RegExp(t(e),"g"),unescape(e));return u.replace(/\[AFMSKIP\]/g,"<code><pre>```").replace(/\[\/AFMSKIP\]/g,"```</pre></code>").trim()},Object.defineProperty(e,"__esModule",{value:!0})}));