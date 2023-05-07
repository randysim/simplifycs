import prisma from "@/lib/db.js";

export async function getServerSideProps(context) {
  let articles = await prisma.article.findMany();

  return {
    props: {
      articles: articles,
    },
  };
}

export default function Articles({ articles }) {
  return (
    <>
      {
        articles.map((article, i) => (
          <a href={`/articles/${article.title}`} key={i}>{article.title}</a>
        ))
      }
    </>
  );
}
