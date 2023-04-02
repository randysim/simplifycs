import styles from "@/styles/Article.module.css";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useState, useEffect } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
//one day customizable code style preferences
import * as CodeStyles from "react-syntax-highlighter/dist/cjs/styles/prism";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

export default function Post({ title, content }) {
  const components = {
    h1: ({ children }) => <Typography variant="h1" children={children} />,
    h2: ({ children }) => <Typography variant="h2" children={children} />,
    h3: ({ children }) => <Typography variant="h3" children={children} />,
    h4: ({ children }) => <Typography variant="h4" children={children} />,
    h5: ({ children }) => <Typography variant="h5" children={children} />,
    h6: ({ children }) => <Typography variant="h6" children={children} />,
    p: ({ children }) => <Typography variant="p" children={children} />,
    a: ({ children, href }) => <Link href="href" children={children} />,

    code: ({ node, inline, className, children }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          PreTag="div"
          showLineNumbers={true}
          CodeTag={Typography}
          codeTagProps={{ variant: "code" }}
          style={CodeStyles.vscDarkPlus}
          children={children}
        />
      ) : (
        <code className={className}>
          {children}
        </code>
      );
    },

    ol: ({ children, start }) => (
      <List
        sx={{
          listStyleType: "a", //idk why putting any letter here works but an empty string doesnt
          pl: 3,
        }}
        component="ol"
        children={children}
        start={start}
      />
    ),
    ul: ({ children }) => (
      <List
        sx={{
          listStyleType: "disc",
          pl: 3,
        }}
        children={children}
      />
    ),
    li: ({ children }) => (
      <ListItem
        sx={{ padding: 0, display: "list-item", ml: 2 }}
        children={children}
      />
    ),

    blockquote: ({ children }) => (
      <Typography
        component="div"
        sx={{ fontStyle: "italic", borderLeft: "4px solid grey" }}
        children={children}
      />
    ),

    table: ({ children }) => <Table children={children} />,
    tr: ({ style, children }) => (
      <TableRow children={children} style={style} sx={{ border: 1 }} />
    ),
    th: ({ style, children }) => (
      <TableCell sx={{ border: 1 }} children={children} style={style} />
    ),
    td: ({ style, children }) => (
      <TableCell sx={{ border: 1 }} children={children} style={style} />
    ),
  };

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      <p className={styles.title}>Idk anymore</p>
      {
        domLoaded && (
          <ReactMarkdown remarkPlugins={[gfm]} components={components}>
            {MARKDOWN_TEXT}
          </ReactMarkdown>
        )
      }
    </>
  );
}

const MARKDOWN_TEXT = `
---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
- Marker character change forces new list start:
* Ac tristique libero volutpat at
+ Facilisis in pretium nisl aliquet
- Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

// Some comments
line 1 of code
line 2 of code
line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

{ some code, part of Definition 2 }

Third paragraph of definition 2.

_Compact style:_

Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
`;
