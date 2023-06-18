import deleteItem from "@/lib/genericAdminEditorAPIRoute/deleteItem.js";

export default async function handler(req, res) {
  deleteItem(req, res, "article");
}
