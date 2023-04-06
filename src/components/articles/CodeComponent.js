import CodeComponentStatic from "./CodeComponentStatic.js";
import CodeComponentRunnable from "./CodeComponentRunnable.js";

//https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html

export default function CodeComponent({ initialCode, language, runnable }) {
  if (runnable) {
    return <CodeComponentRunnable initialCode={initialCode} language={language} />
  } else {
    return <CodeComponentStatic initialCode={initialCode} language={language} />
  }
}
