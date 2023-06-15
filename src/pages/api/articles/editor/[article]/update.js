import prisma from "@/lib/db.js";

export default async function handler(req, res) {
  if (req.method != "POST") {
    return res
      .status(400)
      .json({ error: "Expected post request.", success: false });
  }

  await prisma.article.update({
    where: {
      id: parseInt(req.query.article),
    },
    data: req.body,
  });

  if (req.body.title) {
    await prisma.activity.update({
      where: {
        id: parseInt(req.query.article),
      },
      data: {
        title: req.body.title,
      },
    });
  }

  res.status(200).json({ success: true, message: "Article updated" });
}
