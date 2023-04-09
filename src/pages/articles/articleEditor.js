import styles from "@/styles/ArticleEditor.module.css";
import RenderMarkdown from "@/components/articles/RenderMarkdown.js";
import { useState, useEffect } from "react";

export default function ArticleEditor() {
  const [content, setContent] = useState("");

  return (
    <>
      <div className={styles.editor}>
        <textarea
          className={styles.input}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
      </div>
      <div className={styles.render}>
        <RenderMarkdown>{content}</RenderMarkdown>
      </div>
    </>
  );
}
