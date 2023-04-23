import { useMemo, useState, useEffect } from "react";
import { getMDXComponent } from 'mdx-bundler/client';
import axios from "axios";

export default function RenderMarkdown({ children }) {
  const [component, setComponent] = useState(<p>Loading...</p>);

  useEffect(() => {
    (async () => {
      let res = await axios.post("http://localhost:3000/api/compileMDX", {source: children});
      let component = res.data.code ? (await getMDXComponent(res.data.code)) : <p>Error!!</p>;
      setComponent(component);
    })();
  }, [children]);

  return component;
}
