'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function lescape (arg) {
  return arg.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g, '\\$&');
}

function afm (arg = '', klass = 'extension', compiler = (x = '') => x, map = {}, label = {}) {
  const win = arg.includes('\r'),
    eol = win ? '\r\n' : '\n',
    skip = arg.match(/[^>]\s*?`{3,3}[^`]+`{3,3}(\r?\n)?/g) || [],
    ents = Array.from(new Set(arg.match(/\&#\w+;/g) || [])),
    escaped = ents.map(i => escape(i)),
    stmp = skip.reduce((a, v) => a.replace(v, ''), arg.toString()),
    tmp = ents.reduce((a, v) => a.replace(new RegExp(lescape(v), 'g'), escape(v)), stmp),
    exts = tmp.match(/(?!\n)(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g) || [],
    lvid = Object.keys(map).filter(i => map[i] === 'VIDEO')[0] || 'VIDEO',
    vid = new RegExp(`(?<!\`\`\`\\r?\\n(\\s+|\\t+)?)\\>\\[\\!${lvid}\\]\\((.*)\\)`, 'g');
  let result = arg.toString();

  for (const ext of exts) {
    const parts = ext.split(win ? /\r\n/ : /\n/).filter(i => i.length > 0 && (/[^\s]+/).test(i)),
      type = (parts[0].match(/\>\[\!(.*)\]/) || [])[1] || '',
      prefix = parts[0].replace(/\>\[.*/, ''),
      nl = `${eol}${prefix}`,
      core = parts.slice(1, parts.length).map(i => {
        let result = i.replace(/^(\s+|\t+)?\>/, '').trim();

        for (const ent of ents) {
          if (result.includes(ent)) {
            result = result.replace(new RegExp(lescape(ent), 'g'), escape(ent));
          }
        }

        return result;
      }).filter((i, idx) => idx === 0 ? i.length > 0 : true).join(eol).trim(),
      body = compiler(core).split(eol).map(i => `${prefix}${i}`).join(eol),
      ctype = (type in map ? map[type] : type).toLowerCase().replace(/\s/g, ''),
      og = parts.map(i => {
        let result = i;

        for (const ent of escaped) {
          if (result.includes(ent)) {
            result = result.replace(new RegExp(lescape(ent), 'g'), unescape(ent));
          }
        }

        return result;
      }).join(eol);

    result = result.replace(og, `${prefix}<div class="${klass} ${ctype}">${nl}<div>${type in label ? label[type] : type}</div>${nl}<div>${eol}${body}${nl}</div>${nl}</div>${eol}`);
  }

  result = result.replace(vid, `<div class="${klass} video"><iframe allowfullscreen embedded-video src="$2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="$2" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>`);

  for (const earg of escaped) {
    result = result.replace(new RegExp(lescape(earg), 'g'), unescape(earg));
  }

  return result.trim();
}

exports.afm = afm;
