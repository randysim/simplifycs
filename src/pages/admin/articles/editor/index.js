import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

export default function Editor() {
  const { data, mutate } = useSWR("/api/articles/editor/getArticles", fetcher);

  async function createNewArticle() {
    await axios.post("/api/articles/editor/create");
    mutate();
  }

  return (
    <div className={styles.articleList} style={{ color: "white" }}>
      <center>Articles</center>
      {(data || []).map((article, i) => (
        <div key={i}>
          <a
            href={`/admin/articles/editor/${article.id}`}
            style={{ marginRight: "5px" }}
          >
            {article.title}
          </a>
        </div>
      ))}

      <button onClick={createNewArticle}>Add New Article</button>
    </div>
  );
}
