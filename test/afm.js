'use strict';

const path = require('path'),
  assert = require('assert'),
  {readFileSync} = require('fs'),
  {afm} = require(path.join(__dirname, '..', 'dist', 'afm.cjs.js')),
  markdown = readFileSync(path.join(__dirname, 'markdown', 'afm.md'), 'utf8');

describe('Adobe Flavored Markdown - afm()', function () {
  const result = afm(markdown);

  it('should return a string', function () {
    assert.strictEqual(typeof result, 'string');
  });

  it('should contain DIV elements', function () {
    assert.strictEqual(result.includes('<div class="extension'), true);
  });

  it('should not contain unprocessed tags', function () {
    assert.strictEqual(result.includes('>!NOTE'), false);
  });
});
