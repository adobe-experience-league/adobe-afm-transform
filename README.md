# adobe-afm-transform
Adobe Flavored Markdown transform function for use within your toolchain.

### API
`afm(arg = '', klass = 'extension', converter = x => x)`

The second and third arguments are optional. The second argument default value aligns with Adobe Experience League documents.

### Example
```js
import {afm} from 'afm';
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

<div class="extension note"><div>NOTE</div><div>This is an AFM note!</div></div>\n' +

This is a paragraph.
```

### License
Copyright 2020 Adobe Inc.
Licensed under the Apache-2.0 license.