'use strict';

export default function afm (arg = '', klass = 'extension', compiler = x => x) {
  const skip = arg.match(/`{3,3}[^`]+`{3,3}(\n)?/g) || [],
    tmp = skip.reduce((a, v) => a.replace(v, ''), arg),
    exts = tmp.match(/(\s+|\t+)?\>\[\!.*\n((\s+|\t+)?\>[^\[].*\n?){1,}/g) || [];
  let result = arg;

  for (const ext of exts) {
    const parts = ext.split('\n').filter(i => i.length > 0 && (/[^\s]+/).test(i)),
      type = (parts[0].match(/\>\[\!(.*)\]/) || [])[1] || '',
      prefix = parts[0].replace(/\>\[.*/, ''),
      body = parts.slice(1, parts.length).map(i => i.replace(/^(\s+|\t+)?\>/, '')).filter((i, idx) => idx === 0 ? i.length > 0 : true).join('\n').trim();

    result = result.replace(parts.join('\n'), `${prefix}<div class="${klass} ${type.toLowerCase().replace(/\s/g, '')}"><div>${type}</div><div>${compiler(body)}</div></div>\n`);
  }

  result = result.replace(/\>\[\!VIDEO\]\((.*)\)/g, `<div class="${klass} video"><iframe allowfullscreen embedded-video src="$1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"><source src="$1" type="" /><p>Your browser does not support the iframe element.</p></iframe></div>`);

  return result;
}
