import Editor from "@monaco-editor/react";
import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

export default function ArticlesList({ selectArticle, selectedArticle }) {
  const { data, mutate } = useSWR("/api/articles/editor/getArticles", fetcher, { refreshInterval: 100 });

  function deleteArticle(article) {
    axios.delete("/api/articles/editor/updateArticle", {
      data: {
        id: article.id
      }
    }).then(() => {mutate()});
  }

  function updateArticleTitle(article, newTitle) {
    axios.post("/api/articles/editor/updateArticle", {
      id: article.id,
      data: {
        title: newTitle
      }
    }).then(() => {mutate()});
  }

  function createNewArticle() {
    axios.post("/api/articles/editor/createNewArticle").then(() => {mutate()});
  }

  return (
    <div className={styles.articleList}>
      <center>Articles</center>

      {
        (data || []).map((article, i) => (
          <div style={{display: "flex", background: (article.id == selectedArticle) ? "#00ff00" : "#ff0000"}} key={i}>
            <input defaultValue={article.title} onChange={(event) => {updateArticleTitle(article, event.target.value)}} />

            <button onClick={() => {selectArticle(article)}}>Edit</button>

            <button onClick={() => {deleteArticle(article)}}>Delete</button>
          </div>
        ))
      }

      <button onClick={createNewArticle}>Add New Article</button>
    </div>
  );
}
