function e(e=""){return e.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g,"\\$&")}function t(e="",t="",n=[],r=0){let i=0,s=r;const l=n.filter((t=>t.includes(e))).map((n=>{const r=t.indexOf(n,i)+n.indexOf(e);return r>i&&(i=r),r}));if(l.includes(s))for(;l.includes(s);)s=t.indexOf(e,s+1);return s}function n(n="",r="extension",i=((e="")=>e),s={},l={}){const c=n.includes("\r")?"\r\n":"\n",o=Array.from(new Set(n.match(/\&#\w+;/g)||[])),p=o.map((e=>escape(e))),a=n.split(/(?<!`)`{3,3}(?!`)/g),f=a.filter(((e,t)=>t%2==1)).map((e=>`\`\`\`${e.startsWith(c)?"":c}${e}${e.endsWith(c)?"":c}\`\`\``)),$=a.filter(((e,t)=>t%2==0)).map((e=>e.replace(/(^[\r?\n]+|[\r?\n]+$)/g,""))).join(c),d=o.reduce(((t,n)=>t.replace(new RegExp(e(n),"g"),escape(n))),$),g=d.match(/(?!\r?\n)(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g)||[],u=Object.keys(s).filter((e=>"VIDEO"===s[e]))[0]||"VIDEO",m=d.match(new RegExp(`\\>\\[\\!${u}\\]\\((.*)\\)`,"g"))||[];let h=function(e=""){return JSON.parse(JSON.stringify(e))}(n);for(const n of g){const a=n.split(/\r?\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),$=(a[0].match(/\>\[\!(.*)\]/)||[])[1]||"",d=a[0].replace(/\>\[.*/,""),g=`${c}${d}`,u=`${d}${i(a.slice(1,a.length).map((t=>{let n=t.replace(/^(\s+|\t+)?\>/,"").trim();for(const t of o)n.includes(t)&&(n=n.replace(new RegExp(e(t),"g"),escape(t)));return n})).filter(((e,t)=>0!==t||e.length>0)).join(c).trim()).split(/\r?\n/).join(g)}`,m=($ in s?s[$]:$).toLowerCase().replace(/\s/g,""),x=a.map((t=>{let n=t;for(const t of p)n.includes(t)&&(n=n.replace(new RegExp(e(t),"g"),unescape(t)));return n})).join(c);let w=h.indexOf(x);f.length>0&&(w=t(x,h,f,w)),h=`${h.slice(0,w)}${d}<div class="${r} ${m}">${g}<div>${$ in l?l[$]:$}</div>${g}<div>${c}${u.replace(/\r?\n$/,"")}${g}</div>${g}</div>${g}${h.slice(w+x.length)}`}for(const e of m){const n=e.replace(/^.*\(|\).*$/g,"");let i=h.indexOf(e);f.length>0&&(i=t(e,h,f,i)),h=`${h.slice(0,i)}<div class="${r} video"><iframe allowfullscreen embedded-video src="${n}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="${n}" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>${h.slice(i+e.length)}`}for(const t of p)h=h.replace(new RegExp(e(t),"g"),unescape(t));return h.trim()}export{n as afm};