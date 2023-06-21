import getItems from "@/lib/genericAdminEditorAPIRoute/getItems.js";

export default async function handler(req, res) {
  getItems(req, res, "quiz");
}
