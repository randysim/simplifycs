import CodeComponentStatic from "./CodeComponentStatic.js";
import CodeComponentRunnable from "./CodeComponentRunnable.js";

export default function CodeComponent({ runnable, ...props }) {
  if (props.initialCodeB64) {
    props.initialCode = atob(props.initialCodeB64);
  }
  
  if (runnable) {
    return (
      <CodeComponentRunnable {...props} />
    );
  } else {
    return (
      <CodeComponentStatic {...props} />
    );
  }
}
