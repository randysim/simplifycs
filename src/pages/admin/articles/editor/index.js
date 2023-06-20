import GenericAdminEditorDashboard from "@/components/admin/GenericAdminEditorDashboard.js";

export default function ArticleEditor() {
  return (
    <GenericAdminEditorDashboard
      title="Articles"
      getItemsAPI="/api/articles/editor/getArticles"
      createNewItemAPI="/api/articles/editor/create"
      itemBasePath="/admin/articles/editor/"
    />
  );
}
