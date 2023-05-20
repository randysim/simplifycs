import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

//https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html

export default function CodeComponentRunnable({ initialCode, language, height }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");

  function executeCode() {
    axios
      .post("/api/runCode", {
        language: language,
        code: code,
      })
      .then((res) => {
        setOutput(res?.data?.run?.output || res.data.message);
      });
  }

  return (
    <div className="font-code">
      <div style={{ textAlign: "left" }}>
        <button style={{ background: "black" }} onClick={executeCode}>Run {language}</button>
      </div>

      <Editor
        height={height || 20 * Math.min(code.split("\n").length, 15) + 40}
        width="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={setCode}
        options={{
          fontSize: 14,
          minimap: {
            enabled: false,
          },
          contextmenu: false, //dont show weird thing on right click
          copyWithSyntaxHighlighting: false, //text copies normally
          lineHeight: 20,
          scrollBeyondLastLine: false,
          padding: {
            top: 10,
            bottom: 10,
          },
        }}
      />

      <div
        style={{
          width: "100%",
          fontSize: 16,
          color: "white",
          height: 200,
          background: "black",
          overflowY: "scroll",
          cursor: "col-resize",
        }}
      >
        <p style={{ whiteSpace: "pre-line", textAlign: "left" }}>{output}</p>
      </div>
    </div>
  );
}
