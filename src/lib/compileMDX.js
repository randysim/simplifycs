import { bundleMDX } from "mdx-bundler";
import fs from "fs";

export default async function compileMDX(mdxSource) {
  let files = {};

  let i = 0;
  mdxSource = mdxSource.replace(
    /<\s*?component\s*?>([\S\s]*?)<\s*?\/\s*?component\s*?>/,
    (match, code) => {
      files[`./Component${i}.tsx`] = code;
      return `
import Component${i} from "./Component${i}"

<div style={{background: "#2C2C2C", borderRadius: "15px", border: "solid 1px white"}}><Component${i} /></div>
      `;
    }
  );

  mdxSource = mdxSource.replace(
    /<(\s*?CodeComponent[\S\s]*?)>([\S\s]*?)<\s*?\/\s*?CodeComponent\s*?>/,
    (match, opening, code) => {
      code = code.trimStart();
      return `
<${opening} initialCodeB64=\"${btoa(code)}\" />
      `;
    }
  );

  mdxSource = `
import CodeComponent from "CodeComponent";

${mdxSource}
`;

  mdxSource = mdxSource.trim();

  const result = await bundleMDX({
    source: mdxSource,
    files: { ...files },
    globals: { CodeComponent: "myCodeComponent" },
  });

  return result;
}
