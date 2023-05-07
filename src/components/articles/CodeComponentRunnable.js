import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

//https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html

export default function CodeComponentRunnable({ initialCode, language }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");

  function executeCode() {
    axios
      .post("/api/runCode", {
        language: language,
        code: code,
      })
      .then((res) => {
        setOutput(res.data.run.output);
      });
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <Editor
          height={500}
          width="50vw"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={setCode}
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

        <div
          style={{
            width: "50vw",
            fontSize: 16,
            color: "white",
            height: 500,
            background: "black",
            overflowY: "scroll",
            cursor: "col-resize",
          }}
        >
          <p style={{ whiteSpace: "pre-line" }}>{output}</p>
        </div>
      </div>

      <button onClick={executeCode}>Run {language}</button>
    </>
  );
}
