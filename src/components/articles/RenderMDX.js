import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import CodeComponent from "@/components/articles/CodeComponent.js";

export default function RenderMDX({ children }) {
  const Component = useMemo(
    () => getMDXComponent(children, {"myCodeComponent": CodeComponent}),
    [children, CodeComponent]
  );

  return (
    <Component />
  );
}
