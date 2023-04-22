import { bundleMDX } from 'mdx-bundler';

export default async function compileMDX(mdxSource) {
  mdxSource = mdxSource.trim();

  let files = {};
  
  mdxSource = mdxSource.replace(/<\s*Component\s*name\s*=\s*"(.*)"\s*>([\S\s]*)<\s*\/\s*Component\s*>/, (match, name, code) => {
    files[`./${name}.tsx`] = code;
    return `import ${name} from "./${name}"\n`; //need to add extra \n or the program will crash if there isnt a newline between the component declaration and the component usage
  });

  const result = await bundleMDX({
    source: mdxSource,
    files
  });

  return result;
}
