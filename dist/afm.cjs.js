'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function afm (arg = '', klass = 'extension', compiler = (x = '') => x, map = {}, label = {}) {
  const win = arg.includes('\r'),
    eol = win ? '\r\n' : '\n',
    skip = arg.match(/`{3,3}[^`]+`{3,3}(\r?\n)?/g) || [],
    tmp = skip.reduce((a, v) => a.replace(v, ''), arg),
    exts = tmp.match(/(\s+|\t+)?\>\[\!.*\r?\n((\s+|\t+)?\>[^\[].*\r?\n?){1,}/g) || [],
    lvid = Object.keys(map).filter(i => map[i] === 'VIDEO')[0] || 'VIDEO',
    vid = new RegExp(`(?<!\`\`\`\\r?\\n(\\s+|\\t+)?)\\>\\[\\!${lvid}\\]\\((.*)\\)`, 'g');
  let result = arg;

  for (const ext of exts) {
    const parts = ext.split(win ? /\r\n/ : /\n/).filter(i => i.length > 0 && (/[^\s]+/).test(i)),
      type = (parts[0].match(/\>\[\!(.*)\]/) || [])[1] || '',
      prefix = parts[0].replace(/\>\[.*/, ''),
      body = parts.slice(1, parts.length).map(i => i.replace(/^(\s+|\t+)?\>/, '')).filter((i, idx) => idx === 0 ? i.length > 0 : true).join(eol).trim(),
      ctype = (type in map ? map[type] : type).toLowerCase().replace(/\s/g, '');

    result = result.replace(parts.join(eol), `${prefix}<div class="${klass} ${ctype}"><div>${type in label ? label[type] : type}</div><div>${compiler(body)}</div></div>${eol}`);
  }

  result = result.replace(vid, `<div class="${klass} video"><iframe allowfullscreen embedded-video src="$2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="$2" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>`);

  return result;
}

exports.afm = afm;
