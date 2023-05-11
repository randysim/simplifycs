import prisma from "@/lib/db.js";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Expected get request.", success: false });
  }

  res.status(200).json(
    await prisma.article.findMany({
      select: {
        title: true,
        id: true,
      },
    })
  );
}
