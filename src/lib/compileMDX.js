import { bundleMDX } from "mdx-bundler";
import fs from "fs";

//our own components that we can make available to mdx
const builtInComponents = {
  "./CodeComponentStatic.tsx": fs.readFileSync(
    "./src/components/articles/CodeComponentStatic.js"
  ),
  "./CodeComponentRunnable.tsx": fs.readFileSync(
    "./src/components/articles/CodeComponentRunnable.js"
  ),
};

export default async function compileMDX(mdxSource) {
  let files = {};

  mdxSource = mdxSource.replace(
    /<\s*Component\s*name\s*=\s*"(.*)"\s*>([\S\s]*)<\s*\/\s*Component\s*>/,
    (match, name, code) => {
      files[`./${name}.tsx`] = code;
      return `import ${name} from "./${name}"\n`; //need to add extra \n or the program will crash if there isnt a newline between the component declaration and the component usage
    }
  );

  mdxSource = mdxSource
    .split("\n")
    .reduce((accumulator, currentValue, currentIndex, array) => {
      accumulator += currentValue + "\n";

      if (currentValue.startsWith("import") && array[currentIndex + 1] != "") {
        accumulator += "\n";
      }

      return accumulator;
    }, "");

  mdxSource = mdxSource.trim();

  const result = await bundleMDX({
    source: mdxSource,
    files: { ...files, ...builtInComponents },
  });

  return result;
}
