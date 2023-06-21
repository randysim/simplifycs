import updateItem from "@/lib/genericAdminEditorAPIRoute/updateItem.js";

export default async function handler(req, res) {
  updateItem(req, res, "quiz");
}
