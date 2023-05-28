import compileMDX from "@/lib/compileMDX.js";
import RenderMDX from "@/components/articles/RenderMDX.js";
import adminOnly from "@/lib/adminOnly.js";

export const getServerSideProps = adminOnly(async (context) => {
  try {
    let { code } = await compileMDX(atob(context.query.source));

    return {
      props: {
        compiledMDX: code,
      },
    };
  } catch (e) {
    return {
      props: {
        error: e.toString(),
      },
    };
  }
});

export default function Preview(props) {
  return (
    <div
      style={{
        width: "60%",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
      }}
    >
      {props.error ? (
        <p>Compilation Error: {props.error}</p>
      ) : (
        <RenderMDX>{props.compiledMDX}</RenderMDX>
      )}
    </div>
  );
}
