import { bundleMDX } from "mdx-bundler";
import fs from "fs";

//our own components that we can make available to mdx
let builtInComponents = {
  "./CodeComponentStatic.tsx": fs.readFileSync(
    "./src/components/articles/CodeComponentStatic.js"
  ),
  "./CodeComponentRunnable.tsx": fs.readFileSync(
    "./src/components/articles/CodeComponentRunnable.js"
  ),
  "./CodeComponent.tsx": fs
    .readFileSync("./src/components/articles/CodeComponent.js")
    .toString()
    .replaceAll(".js", ".tsx"), //js doesnt work for some reason
};

export default async function compileMDX(mdxSource) {
  let files = {};

  let i = 0;
  mdxSource = mdxSource.replace(
    /<\s*?component\s*?>([\S\s]*?)<\s*?\/\s*?component\s*?>/,
    (match, code) => {
      files[`./Component${i}.tsx`] = code;
      return `
import Component${i} from "./Component${i}"

<Component${i} />
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
import CodeComponent from "./CodeComponent";

${mdxSource}
`;

  mdxSource = mdxSource.trim();

  const result = await bundleMDX({
    source: mdxSource,
    files: { ...files, ...builtInComponents },
  });

  return result;
}
