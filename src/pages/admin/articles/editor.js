import ArticleRenderer from "@/components/articles/editor/ArticleRenderer.js";
import ArticlesList from "@/components/articles/editor/ArticlesList.js";
import { useState } from "react";
import styles from "@/styles/ArticleEditor.module.css";
import axios from "axios";

export default function ArticleEditor() {
  const [articleId, setArticleId] = useState(-1);
  const [content, setContent] = useState("");

  return (
    <>
      <ArticlesList
        selectArticle={({ id, title, content }) => {
          setContent(content);
          setArticleId(id);
        }}
        selectedArticle={articleId}
      />
      <ArticleRenderer
        content={content}
        articleId={articleId}
        onChange={setContent}
      />
      <button
        className={styles.saveArticleButton}
        onClick={() => {
          axios.post("/api/articles/editor/updateArticle", {
            id: articleId,
            data: {
              content: content,
            },
          });
        }}
        disabled={articleId == -1}
      >
        Save Current Article
      </button>
    </>
  );
}
