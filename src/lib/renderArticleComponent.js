import CodeComponent from "@/components/articles/CodeComponent.js";

export default function renderArticleComponent(component) {
  switch (component.type) {
    case "Paragraph": {
      return <p>{component.Content}</p>;
    }
    case "Section": {
      return <h2>{component.Title}</h2>;
    }
    case "Title": {
      return <h1>{component.Value}</h1>;
    }
    case "Code": {
      return (
        <CodeComponent
          runnable={component.Runnable == "True"}
          language={component.Language}
          initialCode={component.Code}
        />
      );
    }
    case "Image": {
      return <img src={component.src} />;
    }
    case "Custom Component": {
      return <iframe srcdoc={component.Code} />;
    }
  }
}
