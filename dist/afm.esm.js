function e(e){return e.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g,"\\$&")}function r(r="",t="extension",n=((e="")=>e),c={},s={}){const i=r.includes("\r")?"\r\n":"\n",o=r.match(/[^>]\s*?```[^```]+```(\r?\n)?/g)||[],l=Array.from(new Set(r.match(/\&#\w+;/g)||[])),p=l.map((e=>escape(e))),a=o.reduce(((e,r)=>e.replace(r,"")),r.toString()),g=l.reduce(((r,t)=>r.replace(new RegExp(e(t),"g"),escape(t))),a).match(/(?!\r?\n)(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g)||[],$=Object.keys(c).filter((e=>"VIDEO"===c[e]))[0]||"VIDEO",d=new RegExp(`(?<!\`\`\`\\r?\\n(\\s+|\\t+)?)\\>\\[\\!${$}\\]\\((.*)\\)`,"g");let f=r.toString();for(const r of g){const o=r.split(/\r?\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),a=(o[0].match(/\>\[\!(.*)\]/)||[])[1]||"",g=o[0].replace(/\>\[.*/,""),$=`${i}${g}`,d=`${g}${n(o.slice(1,o.length).map((r=>{let t=r.replace(/^(\s+|\t+)?\>/,"").trim();for(const r of l)t.includes(r)&&(t=t.replace(new RegExp(e(r),"g"),escape(r)));return t})).filter(((e,r)=>0!==r||e.length>0)).join(i).trim()).split(/\r?\n/).join($)}`,u=(a in c?c[a]:a).toLowerCase().replace(/\s/g,""),m=o.map((r=>{let t=r;for(const r of p)t.includes(r)&&(t=t.replace(new RegExp(e(r),"g"),unescape(r)));return t})).join(i);f=f.replace(m,`${g}<div class="${t} ${u}">${$}<div>${a in s?s[a]:a}</div>${$}<div>${i}${d.replace(/\r?\n$/,"")}${$}</div>${$}</div>`)}f=f.replace(d,`<div class="${t} video"><iframe allowfullscreen embedded-video src="$2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="$2" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>`);for(const r of p)f=f.replace(new RegExp(e(r),"g"),unescape(r));return f.trim()}export{r as afm};