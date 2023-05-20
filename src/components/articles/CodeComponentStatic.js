import Editor from "@monaco-editor/react";

//https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html

export default function CodeComponentStatic({ initialCode, language, height }) {
  return (
    <div className="font-code">
      <Editor
        height={height || 20 * Math.min(code.split("\n").length, 15) + 40}
        width="100%"
        language={language}
        theme="vs-dark"
        value={initialCode}
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
          readOnly: true,
        }}
        onMount={(editor, monaco) => {
          //prevent "Cannot edit in read-only editor" message
          //this probably isnt the right way to do this
          editor.onDidAttemptReadOnlyEdit = function (event) {};
        }}
      />
    </div>
  );
}
