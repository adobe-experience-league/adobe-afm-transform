# adobe-afm-transform
Adobe Flavored Markdown transform function for use within your toolchain.

### Installation
`npm install adobe-afm-transform`

### Usage
Named export is `afm`:

#### ES Module
```javascript
import {afm} from 'adobe-afm-transform';
```

#### CommonJS / node.js
```javascript
const {afm} = require('adobe-afm-transform');
```

### Function parameters
1. Markdown string to transform
1. (Optional) CSS class to decorate, default is `extension`
1. (Optional) Markdown compiler, default is pass-thru - *required* to support nested markdown
1. (Optional) Admonitions map for consistent CSS classes, e.g. `{"WICHTIG": "IMPORTANT"}`
1. (Optional) Admonitions map for label rewrite, e.g. `{"MORELIKETHIS": "Related Articles"}`

### Example
```js
import {afm} from 'adobe-afm-transform';
const markdown = `# Sample

>[!NOTE]
>
>This is an AFM note!

This is a paragraph.
`;

afm(markdown);
```

The output would be:
```markdown
# Sample

<div class="extension note"><div>NOTE</div><div>This is an AFM note!</div></div>

This is a paragraph.
```

### License
Copyright 2020 Adobe Inc.
Licensed under the Apache-2.0 license.
