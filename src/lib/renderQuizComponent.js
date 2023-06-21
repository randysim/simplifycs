import CodeComponent from "@/components/articles/CodeComponent.js";

export default function renderQuizComponent(component) {
  switch (component.type) {
    case "MCQ": {
      return (
        <>
          <p>{component.Prompt}</p>

          <button>{component["Choice A"]}</button>
          <br />
          <button>{component["Choice B"]}</button>
          <br />
          <button>{component["Choice C"]}</button>
          <br />
          <button>{component["Choice D"]}</button>
        </>
      );
    }
    case "FRQ": {
      return (
        <>
          <p>{component.Prompt}</p>

          <CodeComponent
            runnable={component.Runnable == "True"}
            language={"txt"}
            initialCode={component.Skeleton}
            editable={true}
          />
        </>
      );
    }
    case "MULTISELECT": {
      return <h1>{component.Value}</h1>;
    }
  }
}
