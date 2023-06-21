import prisma from "@/lib/db.js";

export async function getServerSideProps(context) {
  let articles = await prisma.article.findMany();

  articles = JSON.parse(JSON.stringify(articles));

  return {
    props: {
      articles: articles,
    },
  };
}

export default function Articles({ articles }) {
  return (
    <>
      {articles.map((article, i) => (
        <a href={`/activities/articles/${article.title}`} key={i}>
          {article.title}
        </a>
      ))}
    </>
  );
}
