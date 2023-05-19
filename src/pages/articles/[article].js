import styles from "@/styles/Article.module.css";
import { useRouter } from "next/router";
import prisma from "@/lib/db.js";
import RenderMDX from "@/components/articles/RenderMDX.js";

export async function getServerSideProps(context) {
  let articleTitle = context.query.article;

  let article = await prisma.article.findUnique({
    where: {
      title: articleTitle,
      type: "ARTICLE",
    },
  });

  if (!article) {
    return {
      redirect: {
        destination: "/articles",
      },
    };
  }

  return {
    props: {
      title: article.title,
      compiledMDX: article.compiledMDX,
    },
  };
}

export default function Article({ title, compiledMDX }) {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div
        style={{
          width: "60%",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <RenderMDX className={styles.article}>{compiledMDX}</RenderMDX>
      </div>
    </>
  );
}
