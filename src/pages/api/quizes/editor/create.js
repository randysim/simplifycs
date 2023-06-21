import createItem from "@/lib/genericAdminEditorAPIRoute/createItem.js";

export default async function handler(req, res) {
  createItem(req, res, "quiz");
}
