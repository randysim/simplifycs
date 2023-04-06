import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
//one day customizable code style preferences
import * as CodeStyles from "react-syntax-highlighter/dist/cjs/styles/prism";
import Typography from "@mui/material/Typography";

import Editor from "@monaco-editor/react";

import { useState } from "react";

//https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html

export default function CodeComponent({ initialCode, language, runnable }) {
  if (!runnable) {
    return (
      <SyntaxHighlighter
        children={initialCode}
        language={language}
        PreTag="div"
        showLineNumbers={true}
        CodeTag={Typography}
        codeTagProps={{ variant: "code" }}
        style={CodeStyles.vscDarkPlus}
      />
    );
  }

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

    console.log(resp);
    console.log(resp.run.output);
    setOutput(resp.run.output);
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <Editor
          height={editorNumLines * 25 + 40}
          width="50vw"
          language="python"
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
