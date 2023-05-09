import prisma from "@/lib/db.js";
import compileMDX from "@/lib/compileMDX.js";

export default async function handler(req, res) {
  if (req.method != "POST") {
    return res.status(400).json({ error: "Expected post request.", success: false });
  }

  await prisma.article.create({
    data: {
      title: "New Article " + new Date().getTime(),
      content: "# Hello World!",
      compiledMDX: (await compileMDX("# Hello World!")).code,
    },
  });

  res.status(200).json({ success: true, message: "Article created" });
}