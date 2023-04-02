import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
//one day customizable code style preferences
import * as CodeStyles from "react-syntax-highlighter/dist/cjs/styles/prism";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

//map markdown to html components
const components = {
  h1: ({ children }) => <Typography variant="h1" children={children} />,
  h2: ({ children }) => <Typography variant="h2" children={children} />,
  h3: ({ children }) => <Typography variant="h3" children={children} />,
  h4: ({ children }) => <Typography variant="h4" children={children} />,
  h5: ({ children }) => <Typography variant="h5" children={children} />,
  h6: ({ children }) => <Typography variant="h6" children={children} />,
  p: ({ children }) => <Typography variant="p" children={children} />,
  a: ({ children, href }) => <Link href={href} children={children} />,

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

export default function RenderMarkdown({ children }) {
  return (
    <>
      <ReactMarkdown remarkPlugins={[gfm]} components={components}>
        {children}
      </ReactMarkdown>
    </>
  );
}
