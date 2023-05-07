import Editor from "@monaco-editor/react";
import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import axios from "axios";

export default function ArticleEditor({
  content,
  articleId,
  onChange,
  onSave,
}) {
  const [rendered, setRendered] = useState(<p>Loading...</p>);

  async function rerender() {
    let res = await axios.post("/api/articles/editor/compileMDX", {
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
  }

  //automatically rerender when new article selected
  useEffect(() => {
    rerender();
  }, [articleId]);

  return (
    <>
      <div className={styles.editor}>
        <button onClick={rerender}>Rerender</button>

        <Editor
          height={500}
          width="40vw"
          language=""
          theme="vs-dark"
          value={content}
          onChange={onChange}
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
