import GenericAdminEditorDashboard from "@/components/admin/GenericAdminEditorDashboard.js";

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
