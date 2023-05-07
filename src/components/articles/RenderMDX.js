import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

export default function RenderMDX({ children }) {
  const Component = useMemo(() => getMDXComponent(children), [children]);

  return <Component />;
}
