import compileMDX from "@/lib/compileMDX.js";
import RenderMDX from "@/components/articles/RenderMDX.js";
import adminOnly from "@/lib/adminOnly.js";

export const getServerSideProps = adminOnly(async (context) => {
  try {
    let { code } = await compileMDX(atob(context.query.source));

    return {
      props: {
        compiledMDX: code
      }
    };
  } catch (e) {
    return {
      props: {
        error: e.toString()
      }
    }
  }
});

export default function Preview(props) {
  return (
    <div className="flex justify-center">
      <div className="prose prose-invert max-w-none w-1/2 prose-headings:text-center">
        {props.error ? <p>Compilation Error: {props.error}</p> : <RenderMDX>{props.compiledMDX}</RenderMDX>}
      </div>
    </div>
  );
}
