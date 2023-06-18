import { useRouter } from "next/router";
import prisma from "@/lib/db.js";
import RenderMDX from "@/components/articles/RenderMDX.js";

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
      compiledMDX: article.compiledMDX,
    },
  };
}

export default function Article({ compiledMDX }) {
  return (
    <>
      <div className="flex justify-center">
        <div className="prose prose-invert max-w-none w-1/2 prose-headings:text-center">
          <RenderMDX>{compiledMDX}</RenderMDX>
        </div>
      </div>
    </>
  );
}
