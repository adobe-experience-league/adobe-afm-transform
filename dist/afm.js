!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).afm={})}(this,(function(e){"use strict";e.afm=function(e="",t="extension",i=((e="")=>e),n={},o={}){const r=e.includes("\r"),s=r?"\r\n":"\n",l=(e.match(/`{3,3}[^`]+`{3,3}(\r?\n)?/g)||[]).reduce(((e,t)=>e.replace(t,"")),e).match(/(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>[^\[].*\r?\n?){1,}/g)||[],c=Object.keys(n).filter((e=>"VIDEO"===n[e]))[0]||"VIDEO",d=new RegExp(`(?<!\`\`\`\\r?\\n(\\s+|\\t+)?)\\>\\[\\!${c}\\]\\((.*)\\)`,"g");let f=e;for(const e of l){const l=e.split(r?/\r\n/:/\n/).filter((e=>e.length>0&&/[^\s]+/.test(e))),c=(l[0].match(/\>\[\!(.*)\]/)||[])[1]||"",d=l[0].replace(/\>\[.*/,""),p=`${s}${d}`,a=i(l.slice(1,l.length).map((e=>e.replace(/^(\s+|\t+)?\>/,"").trim())).filter(((e,t)=>0!==t||e.length>0)).join(s).trim()).split(s).map((e=>`${d}${e}`)).join(s),$=(c in n?n[c]:c).toLowerCase().replace(/\s/g,"");f=f.replace(l.join(s),`${d}<div class="${t} ${$}">${p}<div>${c in o?o[c]:c}</div>${p}<div>${s}${a}${p}</div>${p}</div>${s}`)}return f=f.replace(d,`<div class="${t} video"><iframe allowfullscreen embedded-video src="$2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="$2" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>`),f.trim()},Object.defineProperty(e,"__esModule",{value:!0})}));