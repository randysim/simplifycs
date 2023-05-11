import styles from "@/styles/Article.module.css";
import { useRouter } from "next/router";
import prisma from "@/lib/db.js";
import RenderMDX from "@/components/articles/RenderMDX.js";

export async function getServerSideProps(context) {
  let articleTitle = context.query.article;

  let article = await prisma.article.findMany({
    where: {
      title: articleTitle,
      type: "ARTICLE",
    },
  });

  article = article[0];

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
      <RenderMDX className={styles.article}>{compiledMDX}</RenderMDX>
    </>
  );
}
