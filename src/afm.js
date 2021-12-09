'use strict';

function clone (arg = '') {
  return JSON.parse(JSON.stringify(arg));
}

function lescape (arg = '') {
  return arg.replace(/[\-\[\]{}()*+?.,\\\^\$|#]/g, '\\$&');
}

function pos (arg = '', source = '', skip = [], idx = 0) {
  let lpos = 0,
    result = idx;
  const matches = skip.filter(i => i.includes(arg)).map(i => { // eslint-disable-line no-loop-func
    const x = source.indexOf(i, lpos),
      y = i.indexOf(arg),
      z = x + y;

    if (z > lpos) {
      lpos = z;
    }

    return z;
  });

  if (matches.includes(result)) {
    while (matches.includes(result)) {
      result = source.indexOf(arg, result + 1);
    }
  }

  return result;
}

export function afm (arg = '', klass = 'extension', compiler = (x = '') => x, map = {}, label = {}) {
  const eol = arg.includes('\r') ? '\r\n' : '\n',
    ents = Array.from(new Set(arg.match(/\&#\w+;/g) || [])),
    escaped = ents.map(i => escape(i)),
    sections = arg.split(/(?<!`|>)`{3,3}(?!`)/g),
    skip = sections.filter((i, idx) => idx % 2 === 1).map(i => `\`\`\`${i}\`\`\``),
    exts = arg.match(/\>\[\!.*\r?\n((\s+|\t+)?\>(?!\[\!).*\r?\n?){1,}/g) || [],
    lvid = Object.keys(map).filter(i => map[i] === 'VIDEO')[0] || 'VIDEO';
  let result = clone(arg),
    sanitized = result;

  skip.forEach(i => {
    sanitized = sanitized.replace(i, '');
  });

  const vids = sanitized.match(new RegExp(`\\>\\[\\!${lvid}\\]\\((.*)\\)`, 'g')) || [];

  for (const ext of exts) {
    let lext = ext;
    const embedded = skip.filter(i => ext.includes(i));

    if (embedded.length > 0) {
      for (const embed of embedded) {
        lext = lext.replace(embed, `[AFMSKIP]${embed.replace(/(^`{3,3}|`{3,3}$)/g, '')}[/AFMSKIP]`);
      }
    }

    const parts = lext.split(/\r?\n/).filter(i => i.length > 0 && (/[^\s]+/).test(i)),
      type = (parts[0].match(/\>\[\!(.*)\]/) || [])[1] || '',
      prefix = parts[1].replace(/\>.*/, ''),
      nl = `${eol}${prefix}`,
      core = parts.slice(1, parts.length).map(i => {
        let iresult = i.replace(/^(\s+|\t+)?\>/, '').trimEnd();

        for (const ent of ents) {
          if (iresult.includes(ent)) {
            iresult = iresult.replace(new RegExp(lescape(ent), 'g'), escape(ent));
          }
        }

        return iresult;
      }).filter((i, idx) => idx === 0 ? i.length > 0 : true).join(eol).trim(),
      body = `${prefix}${compiler(core).split(/\r?\n/).join(nl)}`.replace(/\[AFMSKIP\]/g, '<code><pre>```').replace(/\[\/AFMSKIP\]/g, '```</pre></code>'),
      ctype = (type in map ? map[type] : type).toLowerCase().replace(/\s/g, ''),
      next = `<div class="${klass} ${ctype}">${nl}<div>${type in label ? label[type] : type}</div>${nl}<div>${eol}${body.replace(/\r?\n$/, '').trimEnd()}${nl}</div>${nl}</div>${nl}`;

    result = result.replace(ext, next);
  }

  for (const vid of vids) {
    const lurl = vid.replace(/^.*\(|\).*$/g, '');
    let lidx = result.indexOf(vid);

    if (skip.length > 0) {
      lidx = pos(vid, result, skip, lidx);
    }

    result = `${result.slice(0, lidx)}<div class="${klass} video"><iframe allowfullscreen embedded-video src="${lurl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="${lurl}" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>${result.slice(lidx + vid.length)}`;
  }

  for (const earg of escaped) {
    result = result.replace(new RegExp(lescape(earg), 'g'), unescape(earg));
  }

  return result.trim();
}
