import Editor from "@monaco-editor/react";

export default function CodeComponentStatic({ initialCode, language }) {
  let editorNumLines = Math.min(initialCode.split("\n").length, 25);

  //todo: ctrl+f is kinda weird because all keypresses are prevented

  return (
    <div onKeyDown={event => event.preventDefault()}>
      <Editor
        height={editorNumLines * 25 + 40}
        width="50vw"
        language={language}
        theme="vs-dark"
        value={initialCode}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false
          }
        }}
      />
    </div>
  );
}
