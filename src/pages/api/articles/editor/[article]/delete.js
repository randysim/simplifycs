import prisma from "@/lib/db.js";

export default async function handler(req, res) {
  if (req.method != "POST") {
    return res.status(400).json({ error: "Expected post request.", success: false });
  }

  await prisma.article.delete({
    where: {
      id: parseInt(req.query.article),
    },
  });

  res.status(200).json({ success: true, message: "Article deleted" });
}
