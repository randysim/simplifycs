import updateItem from "@/lib/genericAdminEditorAPIRoute/updateItem.js";

export default async function handler(req, res) {
  await updateItem(req, res, "article");
  res.status(200).json({ success: true, message: "Item updated" });
}
