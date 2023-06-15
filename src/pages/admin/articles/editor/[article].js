import Editor from "@monaco-editor/react";
import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getMDXComponent } from "mdx-bundler/client";
import axios from "axios";
import prisma from "@/lib/db.js";
import { TextField, Snackbar } from "@mui/material";
import SimpleEditor from "@/components/admin/SimpleEditor.js";

/* COPIED STUFF */
function useKey(key, cb) {
  const callback = useRef(cb);

  useEffect(() => {
    callback.current = cb;
  });

  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callback.current(event);
      } else if (key === "ctrls" && event.key === "s" && event.ctrlKey) {
        callback.current(event);
      }
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key]);
}

export async function getServerSideProps(context) {
  let articleId = parseInt(context.query.article);

  let article = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
  });

  if (!article) {
    return {
      redirect: {
        destination: "/admin/articles/editor",
      },
    };
  }

  article.createdAt = article.createdAt.toString();
  article.updatedAt = article.updatedAt.toString();
  article.content = JSON.parse(article.content);

  return {
    props: {
      article: article,
    },
  };
}

export default function ArticleEditor({ article }) {
  const [title, setTitle] = useState(article.title);
  const [items, setItems] = useState(article.content);
  const [message, setMessage] = useState("");
  const id = article.id;

  useKey("ctrls", (e) => {
    e.preventDefault();
    saveArticle();
  });

  const router = useRouter();

  async function updateTitle(newTitle) {
    let articles = await axios
      .get("/api/articles/editor/getArticles")
      .then((res) => res.data);

    if (
      articles.some((article) => article.title == newTitle && article.id != id)
    ) {
      let title = document.querySelector("#title");
      title.style.color = "red";

      setTimeout(() => {
        title.style.color = "white";
      }, 500);

      title.focus();
      setMessage("Title must be unique");
    } else {
      axios.post(`/api/articles/editor/${id}/update`, {
        title: newTitle,
      });
    }
  }

  async function saveArticle() {
    await axios.post(`/api/articles/editor/${id}/update`, {
      content: JSON.stringify(items),
    });
    await updateTitle(title);
    setMessage("Article Saved!");
  }

  async function deleteArticle() {
    axios.post(`/api/articles/editor/${id}/delete`);
    router.push("/admin/articles/editor");
  }

  return (
    <>
      <button
        onClick={() => {
          router.push("/admin/articles/editor");
        }}
        className={styles.backButton}
      >
        Back
      </button>

      <button onClick={saveArticle} className={styles.saveButton}>
        Save
      </button>

      <button onClick={deleteArticle} className={styles.deleteButton}>
        Delete
      </button>

      <TextField
        id="title"
        className={styles.title}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <div style={{position: "absolute", top: "50px"}}>
        <SimpleEditor items={items} setItems={setItems} />
      </div>

      <Snackbar
        open={message.length > 0}
        autoHideDuration={6000}
        onClose={() => {
          setMessage("");
        }}
        message={message}
      />
    </>
  );
}
