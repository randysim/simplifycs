import GenericAdminEditorDashboard from "@/components/admin/editors/GenericAdminEditorDashboard.js";

export default function QuizEditor() {
  return (
    <GenericAdminEditorDashboard
      title="Quizes"
      getItemsAPI="/api/quizes/editor/getQuizes"
      createNewItemAPI="/api/quizes/editor/create"
      itemBasePath="/admin/quizes/editor/"
    />
  );
}
