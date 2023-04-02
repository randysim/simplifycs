import styles from "@/styles/Article.module.css";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import RenderMarkdown from "@/components/articles/RenderMarkdown.js";

const prisma = new PrismaClient();

export async function getStaticProps(context) {
  let articleTitle = context.query.article;

  let article = await prisma.article.findUnique({
    where: {
      title: articleTitle,
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
      content: article.content,
    },
  };
}

export default function Article({ title, content }) {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <RenderMarkdown className={styles.article}>{content}</RenderMarkdown>
    </>
  );
}
