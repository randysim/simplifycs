import Editor from "@monaco-editor/react";
import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getMDXComponent } from "mdx-bundler/client";
import axios from "axios";
import prisma from "@/lib/db.js";
import { TextField, Snackbar } from "@mui/material";
import RenderMDX from "@/components/articles/RenderMDX.js";

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

  return {
    props: {
      article: article,
    },
  };
});

export default function ArticleEditor({ article }) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [message, setMessage] = useState("");
  const id = article.id;

  const [savable, setSavable] = useState(false);
  useKey("ctrls", (e) => {
    e.preventDefault();
    if (savable) {
      saveArticle();
    }
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
      content: content,
    });
    await updateTitle(title);
    setSavable(false);
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

      {savable && (
        <button onClick={saveArticle} className={styles.saveButton}>
          Save
        </button>
      )}

      <button onClick={deleteArticle} className={styles.deleteButton}>
        Delete
      </button>

      <TextField
        id="title"
        className={styles.title}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setSavable(true);
        }}
      />

      <div className={styles.editor}>
        <Editor
          height={500}
          width="50vw"
          language=""
          theme="vs-dark"
          value={content}
          onChange={(val) => {
            setContent(val);
            setSavable(true);
          }}
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

      <div className={styles.render}>
        <iframe style={{width: "100%", height: "100%"}} src={`/admin/articles/editor/preview?source=${encodeURIComponent(btoa(content))}`} frameBorder="0" />
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
