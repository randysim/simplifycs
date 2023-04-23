import Editor from "@monaco-editor/react";
import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import axios from "axios";
import { initializeMonacoMdx } from "@mdx-js/monaco";

export default function ArticleEditor() {
  const [content, setContent] = useState("# Hello World!");
  const [rendered, setRendered] = useState(<p>Loading...</p>);

  useEffect(() => {
    (async () => {
      let res = await axios.post("http://localhost:3000/api/compileMDX", {
        source: content,
      });
      try {
        let component = res.data.code ? (
          await getMDXComponent(res.data.code)
        ) : (
          <p>Compilation Error!?! {res.data.error}</p>
        );
        setRendered(component);
      } catch (e) {
        setRendered(<p>Runtime Error?!? {e.toString()}</p>);
      }
    })();
  }, [content]);

  return (
    <>
      <div className={styles.editor}>
        <Editor
          height={500}
          width="50vw"
          language=""
          theme="vs-dark"
          value={content}
          onChange={setContent}
          options={{
            fontSize: 16,
            minimap: {
              enabled: false,
            },
            contextmenu: false, //dont show weird thing on right click
            copyWithSyntaxHighlighting: false, //text copies normally
            lineHeight: 20,
            padding: {
              top: 10,
              bottom: 10,
            },
          }}
        />
      </div>
      <div className={styles.render}>{rendered}</div>
    </>
  );
}
