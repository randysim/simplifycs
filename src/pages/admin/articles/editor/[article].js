import Editor from "@monaco-editor/react";
import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getMDXComponent } from "mdx-bundler/client";
import axios from "axios";
import prisma from "@/lib/db.js";

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

  return {
    props: {
      article: article,
    },
  };
}

export default function ArticleEditor({ article }) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const id = article.id;

  const [rendered, setRendered] = useState(<p>Loading...</p>);
  const router = useRouter();

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
    } else {
      axios.post(`/api/articles/editor/${id}/update`, {
        title: newTitle,
      });
    }
  }

  async function saveArticle() {
    axios.post(`/api/articles/editor/${id}/update`, {
      content: content,
    });
  }

  async function deleteArticle() {
    axios.post(`/api/articles/editor/${id}/delete`);
    router.push("/admin/articles/editor");
  }

  useEffect(() => {
    rerender();
  }, []);

  return (
    <>
      <button onClick={rerender} className={styles.rerenderButton}>
        Rerender
      </button>

      <button onClick={saveArticle} className={styles.saveButton}>
        Save
      </button>

      <button onClick={deleteArticle} className={styles.deleteButton}>
        Delete
      </button>

      <input
        id="title"
        className={styles.title}
        defaultValue={title}
        onBlur={(event) => updateTitle(event.target.value)}
      ></input>

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
