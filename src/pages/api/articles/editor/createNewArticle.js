import prisma from "@/lib/db.js";
import compileMDX from "@/lib/compileMDX.js";

export default async function handler(req, res) {
  if (req.method != "POST") {
    res.status(400).json({ message: "Expected post request.", success: false });
  }

  await prisma.article.create({
    data: {
      title: "New Article",
      content: "# Hello World!",
      compiledMDX: (await compileMDX("# Hello World!")).code,
    },
  });

  res.status(200).json({ success: true, message: "Article created" });
}
