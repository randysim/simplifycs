import Editor from '@monaco-editor/react';

//https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html

export default function CodeComponentStatic({ initialCode, language }) {
  return (
    <Editor
      height={500}
      width="50vw"
      language={language}
      theme="vs-dark"
      value={initialCode}
      options={{
        fontSize: 16,
        minimap: {
          enabled: false,
        },
        contextmenu: false, //dont show weird thing on right click
        copyWithSyntaxHighlighting: false, //text copies normally
        readOnly: true,
      }}
      onMount={(editor, monaco) => {
        //prevent "Cannot edit in read-only editor" message
        //this probably isnt the right way to do this
        editor.onDidAttemptReadOnlyEdit = function(event) {}
      }}
    />
  )
}
