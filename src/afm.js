'use strict';

function lescape (arg) {
  return arg.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g, '\\$&');
}

export function afm (arg = '', klass = 'extension', compiler = (x = '') => x, map = {}, label = {}) {
  const eol = arg.includes('\r') ? '\r\n' : '\n',
    skip = arg.match(/(?<!\\|\>\s*)```[^```]+\\?```(\r?\n)?/g) || [],
    ents = Array.from(new Set(arg.match(/\&#\w+;/g) || [])),
    escaped = ents.map(i => escape(i)),
    stmp = skip.reduce((a, v) => a.replace(v, ''), arg.toString()),
    tmp = ents.reduce((a, v) => a.replace(new RegExp(lescape(v), 'g'), escape(v)), stmp),
    exts = tmp.match(/(?!\r?\n)(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g) || [],
    lvid = Object.keys(map).filter(i => map[i] === 'VIDEO')[0] || 'VIDEO',
    vid = new RegExp(`(?<!\`\`\`\\r?\\n(\\s+|\\t+)?)\\>\\[\\!${lvid}\\]\\((.*)\\)`, 'g');
  let result = arg.toString();

  for (const ext of exts) {
    const parts = ext.split(/\r?\n/).filter(i => i.length > 0 && (/[^\s]+/).test(i)),
      type = (parts[0].match(/\>\[\!(.*)\]/) || [])[1] || '',
      prefix = parts[0].replace(/\>\[.*/, ''),
      nl = `${eol}${prefix}`,
      core = parts.slice(1, parts.length).map(i => {
        let iresult = i.replace(/^(\s+|\t+)?\>/, '').trim();

        for (const ent of ents) {
          if (iresult.includes(ent)) {
            iresult = iresult.replace(new RegExp(lescape(ent), 'g'), escape(ent));
          }
        }

        return iresult;
      }).filter((i, idx) => idx === 0 ? i.length > 0 : true).join(eol).trim(),
      body = `${prefix}${compiler(core).split(/\r?\n/).join(nl)}`,
      ctype = (type in map ? map[type] : type).toLowerCase().replace(/\s/g, ''),
      og = parts.map(i => {
        let iresult = i;

        for (const ent of escaped) {
          if (iresult.includes(ent)) {
            iresult = iresult.replace(new RegExp(lescape(ent), 'g'), unescape(ent));
          }
        }

        return iresult;
      }).join(eol);

    result = result.replace(og, `${prefix}<div class="${klass} ${ctype}">${nl}<div>${type in label ? label[type] : type}</div>${nl}<div>${eol}${body.replace(/\r?\n$/, '')}${nl}</div>${nl}</div>`);
  }

  result = result.replace(vid, `<div class="${klass} video"><iframe allowfullscreen embedded-video src="$2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="$2" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>`);

  for (const earg of escaped) {
    result = result.replace(new RegExp(lescape(earg), 'g'), unescape(earg));
  }

  return result.trim();
}
