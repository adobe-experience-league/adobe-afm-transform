!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).afm={})}(this,(function(e){"use strict";function t(e=""){return e.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g,"\\$&")}function n(e="",t="",n=[],r=0){let i=0,o=r;const c=n.filter((t=>t.includes(e))).map((n=>{const r=t.indexOf(n,i)+n.indexOf(e);return r>i&&(i=r),r}));if(c.includes(o))for(;c.includes(o);)o=t.indexOf(e,o+1);return o}e.afm=function(e="",r="extension",i=((e="")=>e),o={},c={}){const l=e.includes("\r")?"\r\n":"\n",s=Array.from(new Set(e.match(/\&#\w+;/g)||[])),f=s.map((e=>escape(e))),p=e.split(/(?<!`|>)`{3,3}(?!`)/g).filter(((e,t)=>t%2==1)).map((e=>`\`\`\`${e}\`\`\``)),a=s.reduce(((e,n)=>e.replace(new RegExp(t(n),"g"),escape(n))),e),d=e.match(/\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g)||[],u=Object.keys(o).filter((e=>"VIDEO"===o[e]))[0]||"VIDEO",$=a.match(new RegExp(`\\>\\[\\!${u}\\]\\((.*)\\)`,"g"))||[];let g=function(e=""){return JSON.parse(JSON.stringify(e))}(e);for(const e of d){let n=e;const f=p.filter((t=>e.includes(t)));if(f.length>0)for(const e of f)n=n.replace(e,`[AFMSKIP]${e.replace(/(^`{3,3}|`{3,3}$)/g,"")}[/AFMSKIP]`);const a=n.split(/\r?\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),d=(a[0].match(/\>\[\!(.*)\]/)||[])[1]||"",u=a[1].replace(/\>.*/,""),$=`${l}${u}`,m=`${u}${i(a.slice(1,a.length).map((e=>{let n=e.replace(/^(\s+|\t+)?\>/,"").trimEnd();for(const e of s)n.includes(e)&&(n=n.replace(new RegExp(t(e),"g"),escape(e)));return n})).filter(((e,t)=>0!==t||e.length>0)).join(l).trim()).split(/\r?\n/).join($)}`.replace(/\[AFMSKIP\]/g,"<code><pre>```").replace(/\[\/AFMSKIP\]/g,"```</pre></code>"),h=`${u}<div class="${r} ${(d in o?o[d]:d).toLowerCase().replace(/\s/g,"")}">${$}<div>${d in c?c[d]:d}</div>${$}<div>${l}${m.replace(/\r?\n$/,"")}${$}</div>${$}</div>${$}`;g=g.replace(e,h)}for(const e of $){const t=e.replace(/^.*\(|\).*$/g,"");let i=g.indexOf(e);p.length>0&&(i=n(e,g,p,i)),g=`${g.slice(0,i)}<div class="${r} video"><iframe allowfullscreen embedded-video src="${t}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="${t}" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>${g.slice(i+e.length)}`}for(const e of f)g=g.replace(new RegExp(t(e),"g"),unescape(e));return g.trim()},Object.defineProperty(e,"__esModule",{value:!0})}));