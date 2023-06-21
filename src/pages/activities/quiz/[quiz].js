import { useRouter } from "next/router";
import prisma from "@/lib/db.js";
import renderArticleComponent from "@/lib/renderArticleComponent.js";

export async function getServerSideProps(context) {
  let quizId = context.query.quiz;

  let quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
  });

  if (!quiz) {
    return {
      redirect: {
        destination: "/activities",
      },
    };
  }

  quiz = JSON.parse(JSON.stringify(quiz));

  return {
    props: {
      title: quiz.title,
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
