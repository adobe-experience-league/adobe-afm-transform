function e(e=""){return e.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g,"\\$&")}function t(e="",t="",r=[],n=0){let i=0,c=n;const l=r.filter((t=>t.includes(e))).map((r=>{const n=t.indexOf(r,i)+r.indexOf(e);return n>i&&(i=n),n}));if(l.includes(c))for(;l.includes(c);)c=t.indexOf(e,c+1);return c}function r(r="",n="extension",i=((e="")=>e),c={},l={}){const s=r.includes("\r")?"\r\n":"\n",o=Array.from(new Set(r.match(/\&#\w+;/g)||[])),p=o.map((e=>escape(e))),a=r.split(/(?<!`|>)`{3,3}(?!`)/g).filter(((e,t)=>t%2==1)).map((e=>`\`\`\`${e}\`\`\``)),f=r.match(/\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g)||[],d=Object.keys(c).filter((e=>"VIDEO"===c[e]))[0]||"VIDEO",$=r.match(new RegExp(`\\>\\[\\!${d}\\]\\((.*)\\)`,"g"))||[];let g=function(e=""){return JSON.parse(JSON.stringify(e))}(r);for(const t of f){let r=t;const p=a.filter((e=>t.includes(e)));if(p.length>0)for(const e of p)r=r.replace(e,`[AFMSKIP]${e.replace(/(^`{3,3}|`{3,3}$)/g,"")}[/AFMSKIP]`);const f=r.split(/\r?\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),d=(f[0].match(/\>\[\!(.*)\]/)||[])[1]||"",$=f[1].replace(/\>.*/,""),u=`${s}${$}`,m=`${$}${i(f.slice(1,f.length).map((t=>{let r=t.replace(/^(\s+|\t+)?\>/,"").trimEnd();for(const t of o)r.includes(t)&&(r=r.replace(new RegExp(e(t),"g"),escape(t)));return r})).filter(((e,t)=>0!==t||e.length>0)).join(s).trim()).split(/\r?\n/).join(u)}`.replace(/\[AFMSKIP\]/g,"<code><pre>```").replace(/\[\/AFMSKIP\]/g,"```</pre></code>"),h=`<div class="${n} ${(d in c?c[d]:d).toLowerCase().replace(/\s/g,"")}">${u}<div>${d in l?l[d]:d}</div>${u}<div>${s}${m.replace(/\r?\n$/,"")}${u}</div>${u}</div>${u}`;g=g.replace(t,h)}for(const e of $){const r=e.replace(/^.*\(|\).*$/g,"");let i=g.indexOf(e);a.length>0&&(i=t(e,g,a,i)),g=`${g.slice(0,i)}<div class="${n} video"><iframe allowfullscreen embedded-video src="${r}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="${r}" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>${g.slice(i+e.length)}`}for(const t of p)g=g.replace(new RegExp(e(t),"g"),unescape(t));return g.trim()}export{r as afm};