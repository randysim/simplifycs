import CodeComponent from "@/components/articles/CodeComponent.js";

export default function TestCodeExecution() {
  return (
    <>
      <CodeComponent
        language="python"
        runnable={true}
        initialCode="print('hi')"
      />

      <CodeComponent
        language="python"
        runnable={false}
        initialCode="print('hi')"
      />
    </>
  )
}
