function e(e=""){return e.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g,"\\$&")}function t(e="",t="",r=[],n=0){let c=0,i=n;const l=r.filter((t=>t.includes(e))).map((r=>{const n=t.indexOf(r,c)+r.indexOf(e);return n>c&&(c=n),n}));if(l.includes(i))for(;l.includes(i);)i=t.indexOf(e,i+1);return i}function r(r="",n="extension",c=((e="")=>e),i={},l={}){const s=r.includes("\r")?"\r\n":"\n",o=Array.from(new Set(r.match(/\&#\w+;/g)||[])),p=o.map((e=>escape(e))),a=r.split(/(?<!`|>)`{3,3}(?!`)/g).filter(((e,t)=>t%2==1)).map((e=>`\`\`\`${e}\`\`\``)),f=o.reduce(((t,r)=>t.replace(new RegExp(e(r),"g"),escape(r))),r),d=f.match(/(?!\r?\n)(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g)||[],$=Object.keys(i).filter((e=>"VIDEO"===i[e]))[0]||"VIDEO",g=f.match(new RegExp(`\\>\\[\\!${$}\\]\\((.*)\\)`,"g"))||[];let u=function(e=""){return JSON.parse(JSON.stringify(e))}(r);for(const t of d){let r=t;const p=a.filter((e=>t.includes(e)));if(p.length>0)for(const e of p)r=r.replace(e,`[AFMSKIP]${e.replace(/(^`{3,3}|`{3,3}$)/g,"")}[/AFMSKIP]`);const f=r.split(/\r?\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),d=(f[0].match(/\>\[\!(.*)\]/)||[])[1]||"",$=f[0].replace(/\>\[.*/,""),g=`${s}${$}`,m=`${$}${c(f.slice(1,f.length).map((t=>{let r=t.replace(/^(\s+|\t+)?\>/,"").trimEnd();for(const t of o)r.includes(t)&&(r=r.replace(new RegExp(e(t),"g"),escape(t)));return r})).filter(((e,t)=>0!==t||e.length>0)).join(s).trim()).split(/\r?\n/).join(g)}`.replace(/\[AFMSKIP\]/g,"<code><pre>```").replace(/\[\/AFMSKIP\]/g,"```</pre></code>"),h=`${$}<div class="${n} ${(d in i?i[d]:d).toLowerCase().replace(/\s/g,"")}">${g}<div>${d in l?l[d]:d}</div>${g}<div>${s}${m.replace(/\r?\n$/,"")}${g}</div>${g}</div>${g}`;u=u.replace(t,h)}for(const e of g){const r=e.replace(/^.*\(|\).*$/g,"");let c=u.indexOf(e);a.length>0&&(c=t(e,u,a,c)),u=`${u.slice(0,c)}<div class="${n} video"><iframe allowfullscreen embedded-video src="${r}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="${r}" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>${u.slice(c+e.length)}`}for(const t of p)u=u.replace(new RegExp(e(t),"g"),unescape(t));return u.trim()}export{r as afm};