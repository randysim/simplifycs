import Editor from "@monaco-editor/react";
import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getMDXComponent } from "mdx-bundler/client";
import axios from "axios";
import prisma from "@/lib/db.js";
import { TextField, Snackbar } from "@mui/material";
import DragComponentEditor from "@/components/admin/DragComponentEditor.js";
import renderQuizComponent from "@/lib/renderQuizComponent.js";

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
  let quizId = parseInt(context.query.quiz);

  let quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
  });

  if (!quiz) {
    return {
      redirect: {
        destination: "/admin/quizes/editor",
      },
    };
  }

  return {
    props: {
      quiz: quiz,
    },
  };
}

export default function QuizEditor({ quiz }) {
  const [title, setTitle] = useState(quiz.title);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const id = quiz.id;

  useKey("ctrls", (e) => {
    e.preventDefault();
    saveQuiz();
  });

  const router = useRouter();

  async function saveQuiz() {
    await axios.post(`/api/quizes/editor/${id}/update`, {
      content: JSON.stringify(items),
      title: title,
    });
    setMessage("Quiz Saved!");
  }

  async function deleteQuiz() {
    axios.post(`/api/quizes/editor/${id}/delete`);
    router.push("/admin/quizes/editor");
  }

  return (
    <>
      <button
        onClick={() => {
          router.push("/admin/quizes/editor");
        }}
        className={styles.backButton}
      >
        Back
      </button>

      <button onClick={saveQuiz} className={styles.saveButton}>
        Save
      </button>

      <button onClick={deleteQuiz} className={styles.deleteButton}>
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

      <div style={{ position: "absolute", top: "50px" }}>
        <DragComponentEditor
          items={items}
          setItems={setItems}
          components={{
            MCQ: [
              { type: "text", name: "Prompt", default: "Prompt" },
              { type: "text", name: "Choice A", default: "A" },
              { type: "text", name: "Choice B", default: "B" },
              { type: "text", name: "Choice C", default: "C" },
              { type: "text", name: "Choice D", default: "D" },
            ],
            FRQ: [
              { type: "text", name: "Prompt", default: "Prompt" },
              { type: "text", name: "Skeleton", default: "" },
            ],
            MULTISELECT: [
              { type: "text", name: "Prompt", default: "Prompt" },
              { type: "text", name: "Choice A", default: "A" },
              { type: "text", name: "Choice B", default: "B" },
              { type: "text", name: "Choice C", default: "C" },
              { type: "text", name: "Choice D", default: "D" },
            ],
          }}
          renderComponent={renderQuizComponent}
        />
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
