import prisma from "@/lib/db.js";
import compileMDX from "@/lib/compileMDX.js";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    await prisma.article.delete({
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({ success: true, message: "Article deleted" });
  } else if (req.method == "POST") {
    if (req.body.data.content) {
      req.body.data.compiledMDX = (
        await compileMDX(req.body.data.content)
      ).code;
    }

    await prisma.article.update({
      where: {
        id: req.body.id,
      },
      data: req.body.data,
    });

    res.status(200).json({ success: true, message: "Article updated" });
  } else {
    res
      .status(400)
      .json({ error: "Expected post or delete request.", success: false });
  }
}
