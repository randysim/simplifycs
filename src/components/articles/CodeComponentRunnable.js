import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeComponentRunnable({ initialCode, language }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");

  let editorNumLines = Math.min(Math.max(code.split("\n").length, output.split("\n").length), 25);

  async function executeCode() {
    let resp = await fetch("/api/runCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language, code
      }),
    }).then((resp) => resp.json());

    setOutput(resp.run.output);
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <Editor
          height={editorNumLines * 25 + 40}
          width="50vw"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={setCode}
          options={{
            fontSize: 16,
            minimap: {
              enabled: false
            }
          }}
        />

        <div style={{width: "50vw", fontSize: 16, color: "white", height: editorNumLines * 25 + 40, background: "black", overflowY: "scroll"}}>
          <p style={{ whiteSpace: "pre-line" }}>{output}</p>
        </div>
      </div>

      <button onClick={executeCode}>Run {language}</button>
    </>
  );
}
