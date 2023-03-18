import styles from "@/styles/Article.module.css";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import ReactMarkdown from "react-markdown";

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
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

export default function Post({ title, content }) {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <ReactMarkdown className={styles.article}>{content}</ReactMarkdown>
    </>
  );
}
