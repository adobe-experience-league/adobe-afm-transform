'use strict';

const path = require('path'),
  assert = require('assert'),
  markdownit = require('markdown-it'),
  {readFileSync} = require('fs'),
  {afm} = require(path.join(__dirname, '..', 'dist', 'afm.cjs.js')),
  markdown = readFileSync(path.join(__dirname, 'markdown', 'afm.md'), 'utf8'),
  md = markdownit({html: true}),
  html = `<ol>
<li>
<p>From the Activities list, click <strong>Create Activity</strong> &gt; <strong>A/B Test</strong>.</p>
<p><img src="/help/assets/ab_select-new.png" alt="Create Activity drop-down list"></p>
<div class="extension note">
<div>NOTE</div>
<div>
<p>The available activity types depend on your Target account. Some activity types might not appear in your list. For example, Recommendations is a <a href="/help/using/introduction/intro.md#premium">Target Premium feature</a>.</p>
<p>For information about the various activity types, see <a href="/help/using/activities/activities.md#concept_D317A95A1AB54674BA7AB65C7985BA03">Activities</a> and the <a href="/help/using/activities/target-activities-guide.md">Target activities guide</a>.</p>
</div>
</div>
<p><img src="/help/assets/create-ab.png" alt="Create A/B Test Actity"></p>
</li>
<li>
<p>Learn about Dispatcher (this page). Also, see <a href="https://helpx.adobe.com/experience-manager/using/dispatcher-faq.html">frequently asked questions about dispatcher</a>.</p>
</li>
<li>
<p>Install a <a href="https://helpx.adobe.com/experience-manager/6-3/sites/deploying/using/technical-requirements.html">supported web server</a> according to the web server documentation.</p>
<div class="extension note">
<div>NOTE</div>
<div>
<p>Nested note test.</p>
</div>
</div>
</li>
<li>
<p><a href="/help/using/getting-started/dispatcher-install.md">Install the Dispatcher module</a> on your web server and configure the web server accordingly.</p>
</li>
<li>
<p><a href="/help/using/configuring/dispatcher-configuration.md">Configure Dispatcher</a> (the dispatcher.any file).</p>
</li>
<li>
<p><a href="/help/using/configuring/page-invalidate.md">Configure AEM</a> so that content updates invalidate the cache.</p>
</li>
</ol>`,
  invalidHTML = `<blockquote>
<p><a href="https://helpx.adobe.com/experience-manager/kt/sites/using/getting-started-wknd-tutorial-develop/part1.html">Getting Started with AEM Sites Part 1 - Project Setup</a></p>
</blockquote>`;

describe('Adobe Flavored Markdown - afm()', function () {
  const result = afm(markdown, void 0, void 0, {WICHTIG: 'IMPORTANT'}, {MORELIKETHIS: 'Related Articles'});

  it('should return a string', function () {
    assert.strictEqual(typeof result, 'string');
  });

  it('should contain DIV elements', function () {
    assert.strictEqual(result.includes('<div class="extension'), true);
  });

  it('should not contain unprocessed tags', function () {
    assert.strictEqual(result.includes('>!NOTE'), false);
  });

  it('should not contain localized CSS class', function () {
    assert.strictEqual(result.includes('hinweis'), false);
  });

  it('should contain a label rewrite', function () {
    assert.strictEqual(result.includes('Related Articles'), true);
    assert.strictEqual(result.includes('relatedarticles'), false);
    assert.strictEqual(result.includes('morelikethis'), true);
  });
});

describe('markdown-it interoperability', function () {
  const result = afm(markdown, void 0, arg => md.render(arg)),
    compiled = md.render(result);

  it('Admonitions should work with markdown-it "out of the box"', function () {
    assert.strictEqual(compiled.includes(html), true);
  });

  it('Admonitions with anchors at beginning of new lines should work "out of the box"', function () {
    assert.strictEqual(compiled.includes(invalidHTML), false);
  });
});
