import { useRouter } from "next/router";
import prisma from "@/lib/db.js";
import renderArticleComponent from "@/lib/renderArticleComponent.js";

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
        destination: "/activities",
      },
    };
  }

  article = JSON.parse(JSON.stringify(article));

  return {
    props: {
      title: article.title,
      items: JSON.parse(article.content),
    },
  };
}

export default function Article({ items }) {
  return (
    <div className="flex justify-center">
      <div
        className="prose prose-invert max-w-none w-1/2 prose-h1:text-center"
        style={{ width: "50vw", padding: "20px" }}
      >
        {items.map((item, i) => (
          <div className="child:m-0" key={Math.random()}>
            {" "}
            {/*need random key so components actually rerender*/}
            {renderArticleComponent(item)}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
